import { Router } from "express";
import Product from "../../Models/Product";
const router = Router();

import {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    createSale,
    search,
    getSales,
    outOfStock
} from "../../controllers/product";

router.get("/:farmerId", getProducts);
router.post(
    "/",
    Product.uploadedImage,
    addProduct
);
router.delete(
    "/:id",
    deleteProduct
);
router.put(
    "/",
    Product.uploadedImage,
    updateProduct
);

router.patch("/outOfStock/:id", outOfStock);

router.post("/createSale", createSale);
router.get("/getSales/:farmerId", getSales);
router.get("/search/:name", search);

export default router;
