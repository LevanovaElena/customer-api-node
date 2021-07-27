import express from "express";
import customerRouter from "./customers/router";
import productRouter from "./products/router";
import orderRouter from "./order/router";

const router = express.Router();

router.use("/customers", customerRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);

export default router;
