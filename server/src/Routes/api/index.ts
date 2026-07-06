import { Router } from "express";
const router = Router();
import userRouter from './users.js'
import productRouter from './product.js'
import chatRouter from './chat.js';
import messageRouter from './message.js';
import analyticsRouter from './analytics.js';


router.get("/", (req, res) => {
    res.send("Welcome to API Home Page");
});
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/chat', chatRouter);
router.use('/messages', messageRouter);
router.use('/analytics', analyticsRouter);

export default router;