import { Router } from "express";
const router = Router();
import authRouter from './auth.js'
import userRouter from './users.js'
import productRouter from './product.js'
import salesRouter from './sales.js'

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/sales', salesRouter);

export default router;