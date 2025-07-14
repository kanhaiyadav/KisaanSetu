import { Router } from "express";
const router = Router();
import userRouter from './users'
import productRouter from './product'


router.get("/", (req, res) => {
    res.send("Welcome to API Home Page");
});
router.use('/users', userRouter);
router.use('/products', productRouter);

export default router;