import express from "express";
import { productControllers } from "./product.controller";

const router = express.Router();

router.post("/products", productControllers.createProduct);
router.get("/products", productControllers.getProduct);
router.get("/products/:productId", productControllers.getSingleProduct);

export const ProductRoutes = router;
