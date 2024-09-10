import { Router } from "express";
const router = Router();

import { createSale } from "../../controllers/sales.js";

router.post('/', createSale);

export default router;