import express from "express";
import {
  getOrdersListByIdCustomer,
  getOrderById,
  getCustomersByIdProduct,
  createOrder,
} from "../order/controller/order.controller";

const router = express.Router();

router.get("/:idCustomer", getOrdersListByIdCustomer); //что и сколько купил Customer
router.get("/:idOrder", getOrderById); //покупка по id
router.get("/:idProduct", getCustomersByIdProduct); //кто и в каком количестве купил данный товар

router.post("/", createOrder);
/*router.delete("/:productId", deleteProductById);
router.put("/:productId", updateProduct);*/

export default router;
