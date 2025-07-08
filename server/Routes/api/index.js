import { Router } from "express";
const router = Router();
import userRouter from './users.js'
import productRouter from './product.js'


router.get("/", (req, res) => {
    res.send("Welcome to API Home Page");
});
router.use('/users', userRouter);
router.use('/products', productRouter);

export default router;