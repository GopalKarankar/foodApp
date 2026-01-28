import mongoose from "mongoose";


const itemSchema = new mongoose.Schema(
  {
    itemId: String,
    userId: String,
    itemName: String,
    price: String,
    imgLink: String,
    description:String,
    resto_id:String,
  },
  { timestamps: true }
);


const Items = mongoose.models.Items || mongoose.model("Items", itemSchema);

export default Items;
