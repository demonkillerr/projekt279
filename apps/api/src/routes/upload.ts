// api/src/routes/upload.ts
import express from 'express';
import multer from 'multer';
import { S3 } from 'aws-sdk';
import { uploadDuration } from '../monitoring/metrics';

const router = express.Router();
const upload = multer({ 
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

router.post('/', upload.single('photo'), async (req, res) => {
  const timer = uploadDuration.startTimer();
  try {
    const file = req.file;
    const userId = req.user.id;
    
    const s3Response = await s3.upload({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `${userId}/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    }).promise();

    timer({ status: 'success' });
    res.json({ url: s3Response.Location });
  } catch (error) {
    timer({ status: 'error' });
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;