import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('cart.product');
  if (!user) return res.status(404).json({ message: 'User not found' });
  const items = user.cart.map(ci => ({
    product: {
      _id: ci.product._id,
      name: ci.product.name,
      slug: ci.product.slug,
      price: ci.product.price,
      image: ci.product.image
    },
    quantity: ci.quantity,
    subtotal: ci.quantity * ci.product.price
  }));
  const total = items.reduce((s, i) => s + i.subtotal, 0);
  res.json({ items, total });
});

router.post('/', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const user = await User.findById(req.user.id);
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const qty = Math.max(1, Number(quantity || 1));
  const idx = user.cart.findIndex(ci => ci.product.toString() === productId);
  if (idx >= 0) {
    user.cart[idx].quantity += qty;
  } else {
    user.cart.push({ product: productId, quantity: qty });
  }
  await user.save();
  res.json({ message: 'Added to cart' });
});

router.patch('/:productId', auth, async (req, res) => {
  const { quantity } = req.body;
  const user = await User.findById(req.user.id);
  const idx = user.cart.findIndex(ci => ci.product.toString() === req.params.productId);
  if (idx < 0) return res.status(404).json({ message: 'Item not in cart' });
  user.cart[idx].quantity = Math.max(1, Number(quantity || 1));
  await user.save();
  res.json({ message: 'Updated' });
});

router.delete('/:productId', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.cart = user.cart.filter(ci => ci.product.toString() !== req.params.productId);
  await user.save();
  res.json({ message: 'Removed' });
});

export default router;
