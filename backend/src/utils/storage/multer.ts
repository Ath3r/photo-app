import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_req: any, _file: Express.Multer.File, cb: Function) => {
    cb(null, 'public/upload');
  },
  filename: (_req: any, file: Express.Multer.File, cb: Function) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    // fileSize: 1024 * 1024 * 5,
  },
});

export default upload;