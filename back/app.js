require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const bcrypt = require("bcrypt");
const cors = require("cors");
const path = require("path");
const saltRounds = 10;
const storage = require("./multer.js");
const models = require("./models.js");
const token = require("./token.js");
const console = require("console");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log(err));

const upload = multer({ storage: storage });

const User = new mongoose.model("user", models.userSchema);
const Admin = new mongoose.model("admin", models.adminSchema);
const Post = new mongoose.model("post", models.postSchema);

app.post("/api/auth/signup", (req, res) => {
  console.log("post envoyé sur signup");
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email: email }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data) {
        if (data.email === email) {
          console.log("Le mail est déjà utilisé chakal");
          res.send({ message: "Le mail est déjà utilisé chakal" });
        }
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          const newUser = new User({
            email: email,
            password: hash,
          });
          newUser.save((err) => {
            if (err) {
              console.log(err);
            } else {
              res.send({ message: "Utilisateur enregistré" });
            }
          });
        });
      }
    }
  });
});

app.post("/api/auth/login", (req, res) => {
  const {email, password} = req.body

  User.findOne({ email: email }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data) {
        bcrypt.compare(password, data.password, (err, result) => {
          if (result === true) {
            
            const accessToken = token.generateAccessToken(data);
            // console.log(accessToken);
            // console.log(data._id);
            res.send({
              message:'user connected',
              userId: data._id,
              token: accessToken,
            })
          }
          
        });
      }
    }
  });
});

app.post("/api/post", upload.single("image"), (req, res) => {
  console.log(req.body);
  const JsonData = JSON.parse(req.body.post);
  const newPost = new Post(JsonData);
  newPost.likes = 0;
  newPost.dislikes = 0;
  newPost.imageUrl = req.file.path;
  newPost.imageUrl = newPost.imageUrl.replace("..\\front\\src\\", "");
  console.log("image: " + newPost.imageUrl);
  newPost.save().then(console.log("Le post a bien été enregistée"));
  res.send({ message: "tout est ban" });
});

app.get(
  "/api/post/:id",
  token.authenticateToken,
  upload.single("image"),
  function (req, res) {
    // res.send("tagId is set to " + req.params.id);
    Post.findOne({ _id: req.params.id }, (err, data) => {
      res.status(200).json(data);
    });
  }
);

app.get("/api/post", token.authenticateToken, (req, res) => {
  // console.log(req.user);
  Post.find({}, (err, docs) => {
    let postList = [];
    for (let i = 0; i < docs.length; i++) {
      postList.push(docs[i]);
    }
    // console.log(sauceList);
    // console.log(docs);
    res.status(200).json(docs);
  });
});

app.put(
  "/api/post/:id",
  upload.single("image"),
  token.authenticateToken,
  (req, res) => {
    console.log("test ici");
    // let sauceData = JSON.parse(req.body.sauce)
    // console.log(sauceData.name);
    console.log(req.file);

    let JsonData;

    if (typeof req.file == "undefined") {
      console.log("ping");
      let JsonData = req.body;
      Post.updateOne({ _id: req.params.id }, JsonData, (err) => {
        if (!err) {
          res.send({ message: "tout est ban" });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log("pong");
      let JsonData = JSON.parse(req.body.post);
      console.log("obligatoirement ici");

      // Sauce.updateOne({ _id: req.params.id }, JsonData, (err) => {
      //   if (!err) {
      //     console.log("plutot ici");
      //   } else {
      //     console.log("jpense ici");
      //     console.log(err);
      //   }
      // });

      Post.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
          console.log("ok ici");
          console.log(err);
        } else {
          console.log(JsonData);
          data.text = JsonData.text
          data.userId = JsonData.userId;
          data.imageUrl = req.file.path;
          data.imageUrl = data.imageUrl.replace("..\\front\\src\\", "");
          data.save();
        }
      });
      res.send({ message: "tout est bon" });
    }

    console.log(req.params.id);
  }
);

app.delete("/api/post/:id", token.authenticateToken, (req, res) => {
  Post.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      res.send({ message: "tout est ban" });
    } else {
      console.log(err);
    }
  });
});

app.post("/api/post/:id/like", token.authenticateToken, (req, res) => {
  let id = req.params.id;
  // console.log(req)
  // console.log(req.body);
  // console.log(req.body.like);
  // console.log(req.params.id);
  Post.findOne({ _id: req.params.id }, (err, data) => {
    let Index;
    if (err) {
      console.log(err);
    } else {
      if (req.body.like == 1) {
        data.likes += 1;
        data.usersLiked.push(req.body.userId);
        console.log("l'utilisateur a liké le post");
        data.save();
        res.send({ message: "ouais c ban" });
      } else if (req.body.like == 0) {
        if (data.usersLiked.includes(req.body.userId)) {
          Index = data.usersLiked.indexOf(req.body.userId);
          data.likes -= 1;
          data.usersLiked.splice(Index, 1);
          console.log("l'utilisateur a enlevé son like de le post");
          data.save();
          res.send({ message: "ouais c ban" });
        } else if (data.usersDisliked.includes(req.body.userId)) {
          Index = data.usersDisliked.indexOf(req.body.userId);
          data.dislikes -= 1;
          data.usersDisliked.splice(Index, 1);
          console.log("l'utilisateur a enlevé son dislike de le post");
          data.save();
          res.send({ message: "ouais c ban" });
        }
      } else if (req.body.like == -1) {
        data.dislikes += 1;
        data.usersDisliked.push(req.body.userId);
        console.log("l'utilisateur a dislike le post");
        data.save();
        res.send({ message: "ouais c ban" });
      }
    }
  });
});

app.listen(8000, function () {
  console.log("Server started on port 8000");
});
