import { getOrdersList } from "../service/order.service";
import * as productService from "../../products/services/product.service";

/*
getOrdersListByIdCustomer,
    getOrderById,
    getCustomersByIdProduct,
    createOrder,*/
export function getOrderList(req, res, next) {
  return getOrdersList()
    .then((result) => {
      res.json(result);
    })
    .catch(next);
}

export function createOrder(req, res, next) {
  return getOrdersList()
    .then((result) => {
      res.json(result);
    })
    .catch(next);
}
