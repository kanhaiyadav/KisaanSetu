import { Router } from "express";
import { getMessages } from "@/controllers/message.js";
const router = Router();

router.get("/:chatId", getMessages);

export default router;
