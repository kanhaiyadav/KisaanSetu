import { Router } from "express";
import { createChat, getChats } from "@/controllers/chat";
const router = Router();


router.post('/', createChat);
router.get('/:userId', getChats);

export default router;