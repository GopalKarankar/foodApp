import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    itemName: String,
    price: Number,
    imgLink: String,
    description: String,
    resto_id: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default Food;
