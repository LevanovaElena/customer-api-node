import express from 'express';
import {getProductList, getProductById, createProduct,deleteProductById,updateProduct} from "./controllers/product.controller";

const router = express.Router();

router.get('/', getProductList);

router.get('/:productId', getProductById);
router.post('/create/', createProduct);
router.delete('/delete/:productId', deleteProductById);
router.post('/update/:productId', updateProduct);

export default router;