import { Router } from "express";
import { createChat } from "@/controllers/chat";
const router = Router();


router.post('/', createChat);

export default router;