import { Router } from "express";
const router = Router();

import { signUp } from "../../controllers/auth.js";

router.post('/signup', signUp);

export default router;