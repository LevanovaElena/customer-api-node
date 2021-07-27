import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: {
    type: Schema.ObjectId,
    required: true,
    ref: "Customer",
  },
  product: {
    type: Schema.ObjectId,
    required: true,
    ref: "Product",
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
});

export default mongoose.model("Order", orderSchema);
