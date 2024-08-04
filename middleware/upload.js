import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-providers';
import path from 'path';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
  fileFilter: function (req, file, cb) {
    const filetypes = /mp3|wav/;
    const validMimeTypes = ['audio/mpeg', 'audio/wav'];
    const mimetype = validMimeTypes.includes(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    console.log('file.mimetype:', file.mimetype);
    console.log('file.originalname:', file.originalname);
    console.log('extname:', extname);
    console.log('mimetype:', mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: Audio files only!'));
    }
  },
});

export default upload;
