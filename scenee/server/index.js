import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import findRoutes from './routes/findRoutes.js'

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/board", noticeRoutes);
app.use('/api/find', findRoutes);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`서버 연결됨: http://localhost:${PORT}`);
});

