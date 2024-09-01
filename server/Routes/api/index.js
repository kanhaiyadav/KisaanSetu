import { Router } from "express";
const router = Router();
import authRouter from './auth.js'
import userRouter from './users.js'

router.use('/auth', authRouter);
router.use('/users',userRouter);

export default router;