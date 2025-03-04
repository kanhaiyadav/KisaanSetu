import { Router } from "express";
import Product from "../../Models/Product.js";
import passport from "passport";
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
} from "../../controllers/product.js";

router.get("/:farmerId", getProducts);
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    Product.uploadedImage,
    addProduct
);
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    deleteProduct
);
router.put(
    "/",
    passport.authenticate("jwt", { session: false }),
    Product.uploadedImage,
    updateProduct
);

router.patch("/outOfStock/:id", outOfStock);

router.post("/createSale", createSale);
router.get("/getSales/:farmerId", getSales);
router.get("/search/:name", search);

export default router;
