import express from "express";
import customerRouter from "./customers/router";
import productRouter from "./products/router";

const router = express.Router();


router.use('/customers', customerRouter);
router.use('/products', productRouter);

export default router;