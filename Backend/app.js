import express from 'express';
import morgan from 'morgan';
import connectDB from './DB/db.js';
import userRoutes from './routes/userRoutes.js';
import cookie from 'cookie-parser';

connectDB();

const app = express();

app.use(cookie());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Devin AI Backend is running');
});

export default app;