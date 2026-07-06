import { Router } from "express";
import { createChat, getChats } from "@/controllers/chat.js";
const router = Router();


router.post('/', createChat);
router.get('/:userId', getChats);

export default router;