import Order from "../model/order.model";
import productModel from "../../products/model/product.model";

export async function createOrder(body) {
  const newOrder = new Order({ ...body });
  return newOrder.save();
}

export async function getOrder(idOrder) {
  return Order.findOne({ _id: idOrder }).populate("customer product").exec();
}

export async function getOrdersList() {
  return Order.find({}).populate("customer product").exec();
}
