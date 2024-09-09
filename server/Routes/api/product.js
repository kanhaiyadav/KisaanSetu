import { Router } from "express";
import Product from "../../Models/product.js";
import passport from "passport";
const router = Router();

import { getProducts, addProduct, deleteProduct } from "../../controllers/product.js";

router.get('/:farmerId', getProducts);
router.post('/', passport.authenticate('jwt', {session: false}), Product.uploadedImage ,addProduct);
router.delete('/:id', deleteProduct);

export default router;