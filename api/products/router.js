import express from 'express';
import {getProductList, getProductById, createProduct,deleteProductById} from "./controllers/product.controller";

const router = express.Router();

router.get('/', getProductList);

router.get('/:productId', getProductById);
router.use('/create/:productId', createProduct);
router.use('/delete/:productId', deleteProductById);

export default router;