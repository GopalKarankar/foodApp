import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    username: String,
    mobileNo:String,
    password: String,
    city: String,
    address:String,
    userType:{
      type:String,
      default:"deliveryPerson"
    },    
    approveStatus:{
      type:String,
      default:"pending"
    }

  },
  { timestamps: true }
);

const delivery = mongoose.models.deliverypartners || mongoose.model("deliverypartners", deliverySchema);

export default delivery;
