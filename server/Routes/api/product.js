import { Router } from "express";
import Product from "../../Models/product.js";
import passport from "passport";
const router = Router();

import { getProducts, addProduct, deleteProduct, updateProduct, createSale } from "../../controllers/product.js";

router.get('/:farmerId', getProducts);
router.post('/', passport.authenticate('jwt', {session: false}), Product.uploadedImage ,addProduct);
router.delete('/:id', deleteProduct);
router.put('/', Product.uploadedImage, updateProduct);
router.post('/createSale', createSale);

export default router;