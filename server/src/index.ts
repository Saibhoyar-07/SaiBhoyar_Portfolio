import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { createContactMessage } from './controllers/contactController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security headers and CORS
app.use(helmet());
app.use(cors());
app.use(express.json());

// API Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150,
  message: { message: 'Too many requests. Please retry in 15 minutes.' }
});
app.use('/api/', limiter);

// Server health-check checks
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is responsive.' });
});

// Contact Route
app.post('/api/contact', createContactMessage);

// Initialize DB and listen
const bootstrap = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 [Server]: Listening on port ${PORT}`);
  });
};

bootstrap();
