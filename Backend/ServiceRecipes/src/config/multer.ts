import multer from 'multer';
import { v4 } from 'uuid';
import path from 'path';
import config from './config';

const storage = multer.diskStorage({
    destination: config.IMAGE_FOLDER,
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname));
    }
});

export default multer({ storage });
