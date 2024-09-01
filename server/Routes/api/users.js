import { Router } from "express";
const router = Router();

import { unique } from "../../controllers/users.js";

router.post('/unique', unique);

export default router;