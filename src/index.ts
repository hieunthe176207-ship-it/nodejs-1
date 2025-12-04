import express from 'express';
import dotenv from 'dotenv';
import router from './router/root.router';
import connectDB from './config/database';
import { seedDatabase } from './util/seed';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router);


connectDB().then(async () => {
  await seedDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});