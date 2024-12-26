// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRouter from './routes/upload';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRouter);

app.use(metricsMiddleware);
app.get('/metrics', async (req, res) => {
 res.set('Content-Type', client.register.contentType);
 res.send(await client.register.metrics());
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// src/routes/upload.ts
import { Router } from 'express';
import multer from 'multer';
import { S3 } from 'aws-sdk';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const s3 = new S3({
 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
 region: process.env.AWS_REGION
});

router.post('/', upload.single('image'), async (req, res) => {
 try {
   if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

   const params = {
     Bucket: process.env.AWS_BUCKET_NAME!,
     Key: `uploads/${Date.now()}-${req.file.originalname}`,
     Body: req.file.buffer
   };

   const result = await s3.upload(params).promise();
   res.json({ url: result.Location });
 } catch (error) {
   res.status(500).json({ error: 'Upload failed' });
 }
});

export default router;