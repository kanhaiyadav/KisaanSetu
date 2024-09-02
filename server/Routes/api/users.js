import { Router } from "express";
import passport from "passport";
const router = Router();

import { unique, verify } from "../../controllers/users.js";

router.post('/unique', unique);
router.get('/verify', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
            if (info && info.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired, Log in again.' });
            }
            return res.status(401).json({ message: 'Unauthorized. Invalid or expired token.' });
        }
        req.user = user;
        next();
    })(req, res, next);
}, verify);

export default router;