import { Router } from 'express';
const router = Router();

import ApiRouter from './api/index'

router.use('/api', ApiRouter);
router.get('/home', (req, res) => {
    res.send('Welcome to Home Page');
});

export default router;