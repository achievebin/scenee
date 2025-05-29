import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use('/api/auth', authRoutes);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`서버 연결됨: http://localhost:${PORT}`);
});
