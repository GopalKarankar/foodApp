import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    rName: String,
    city: String,
    address: String,
    contact: String,
    userType:{
      type:String,
      default:"restaurant"
    }
  },
  {timestamps:true}
);

const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
