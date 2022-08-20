const userSchema = {
  email: String,
  password: String,
  isAdmin: Boolean,
};

const adminSchema = {
  email: String,
  password: String,
};

const postSchema = {
  text: String,
  imageURL: String,
  userId: String,
  userEmail: String,
  imageURL: String,
  usersLiked: ["String <userId>"],

  usersDisliked: ["String <userId>"],
};

module.exports = {
  userSchema: userSchema,
  adminSchema: adminSchema,
  postSchema: postSchema,
};
