import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type:String,
      default:"NA"
    },
    image:{
      type:String,
      default:"NA"
    },
    email: {
      type:String,
      default:"NA"
    },
    city: {
      type:String,
      default:"NA"
    },
    address:{
      type:String,
      default:"NA"
    },
    mobileNo:{
      type:String,
      default:"NA"
    },
    userType:{
      type:String,
      default:"user"
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
