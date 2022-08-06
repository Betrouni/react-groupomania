const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
  };

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "../front/src/assets/images");
    },  
    filename: (req, file, callback) => {
      const name = file.originalname.split(" ").join("_");
      const extension = MIME_TYPES[file.mimetype];
      console.log("name :" + name);
      callback(null, name);
    },
  });
  


  module.exports = storage
