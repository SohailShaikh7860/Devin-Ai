import express from 'express';
import morgan from 'morgan';
import connectDB from './DB/db.js';
import userRoutes from './routes/userRoutes.js';
import cookie from 'cookie-parser';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import aiRoutes from './routes/ai_routes.js';

connectDB();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://ai-realtime-chat-red.vercel.app',
  'https://ai-realtime-chat-git-main-sohailshaikh7860s-projects.vercel.app',
  'http://localhost:5173', 
  'http://localhost:3000' 
].filter(Boolean);

app.use(cors({
  credentials: true,
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'), false);
  }
}));
app.use(cookie());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Devin AI Backend is running');
});

export default app;