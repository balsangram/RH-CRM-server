import app from '../app.js';
import { connectDB } from '../database/connection.js';

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.error('Serverless database connection error:', error.message);
  }
  return app(req, res);
}
