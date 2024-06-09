import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
