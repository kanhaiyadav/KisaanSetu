import { Router } from "express";
import { getMessages } from "@/controllers/message";
const router = Router();

router.get("/:chatId", getMessages);

export default router;
