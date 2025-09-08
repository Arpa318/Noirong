import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js';
import faqRoutes from './routes/faqs.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

const allowed = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: allowed, credentials: true }));

app.get('/', (req, res) => {
  res.json({ status: 'ok', app: 'Noirong API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/noirongdb';

mongoose.connect(MONGO).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log('Server running on port ' + PORT));
}).catch(err => {
  console.error('Mongo error:', err.message);
  process.exit(1);
});
