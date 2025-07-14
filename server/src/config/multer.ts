import multer from "multer";
import { Request, Response, NextFunction } from 'express';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export const uploadMiddleware = (req: MulterRequest, res: Response, next: NextFunction): void => {
    upload.single('image')(req, res, (err: any) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next();
    });
}
