import express from 'express';
import {PORT} from  './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorMiddleware);

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// Health check route
app.get('/', (req, res) => {
  res.send("welcome to Subscription tracker");
});

//listening to the server port
app.listen(PORT, async() => {
  console.log(`Server running at http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;