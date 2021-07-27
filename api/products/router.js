import express from "express";
import {
  getProductList,
  getProductById,
  createProduct,
  deleteProductById,
  updateProduct,
} from "./controllers/product.controller";

const router = express.Router();

router.get("/", getProductList);
router.get("/:productId", getProductById);

router.post("/", createProduct);
router.delete("/:productId", deleteProductById);
router.put("/:productId", updateProduct);

export default router;
