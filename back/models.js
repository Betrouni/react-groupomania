
const userSchema = {
    email: String,
    password: String,
  };
  
  const adminSchema = {
    email: String,
    password: String,
  };
  
const postSchema = {
  text: String,
  imageURL: String,
  useId: String,
  usersLiked: ["String <userId>"],
  
  usersDisliked: ["String <userId>"],
}


module.exports = {
    userSchema: userSchema,
    adminSchema: adminSchema,
    postSchema:postSchema
};