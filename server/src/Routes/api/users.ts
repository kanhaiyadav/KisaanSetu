import { Router } from "express";
import { uploadMiddleware } from "../../config/multer";
const router = Router();

import { getUser, createNewUser, uploadAvatar, uploadBanner, updateUser } from "@/controllers/user";

router.get('/', getUser);
router.post('/', createNewUser);
router.patch('/', updateUser);
router.patch('/uploadAvatar', uploadMiddleware, uploadAvatar);
router.patch('/uploadBanner', uploadMiddleware, uploadBanner);

export default router;