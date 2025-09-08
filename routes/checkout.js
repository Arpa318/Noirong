import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { number } = req.body;
  if (!number || !/^[0-9]{6,}$/.test(number)) {
    return res.status(400).json({ message: 'Enter a valid payment number (digits only, min 6)' });
  }
  const user = await User.findById(req.user.id).populate('cart.product');
  if (!user || user.cart.length === 0) return res.status(400).json({ message: 'Cart is empty' });
  const items = user.cart.map(ci => ({
    product: ci.product._id,
    name: ci.product.name,
    price: ci.product.price,
    quantity: ci.quantity
  }));
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  // Simulate payment success
  const order = await Order.create({
    user: user._id,
    items,
    total,
    paymentNumber: String(number),
    status: 'paid',
    paidAt: new Date()
  });

  // Reduce stock (simple optimistic update)
  for (const ci of user.cart) {
    const p = await Product.findById(ci.product._id);
    if (p) {
      p.stock = Math.max(0, p.stock - ci.quantity);
      await p.save();
    }
  }

  user.cart = [];
  await user.save();

  res.json({ message: 'Payment successful', orderId: order._id, total });
});

export default router;
