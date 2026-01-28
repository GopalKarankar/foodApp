import mongoose from "mongoose";


const itemSchema = new mongoose.Schema(
  {
    ItemId: String,
    itemName: String,
    price: String,
    imgLink: String,
    description:String,
    resto_id:String,
  }
);


const ordersSchema = new mongoose.Schema(
  {
    userId: String,
    address:String,
    orderId: String,
    items: [itemSchema],
    amount: Number,
    status: String,
    deliveryBoyId: String
  },
  { timestamps: true }
);

const Orders = mongoose.models.Orders || mongoose.model("Orders", ordersSchema);

export default Orders;
