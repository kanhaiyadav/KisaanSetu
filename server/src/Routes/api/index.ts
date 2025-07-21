import { Router } from "express";
const router = Router();
import userRouter from './users'
import productRouter from './product'
import chatRouter from './chat';
import messageRouter from './message';


router.get("/", (req, res) => {
    res.send("Welcome to API Home Page");
});
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/chat', chatRouter);
router.use('/messages', messageRouter);

export default router;