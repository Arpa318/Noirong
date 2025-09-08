import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/products?q=...&category=...
router.get('/', async (req, res) => {
  try {
    const { q, category, limit } = req.query;
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (q) {
      const regex = new RegExp(q, 'i');
      query.$or = [{ name: regex }, { description: regex }];
    }
    let queryExec = Product.find(query).sort({ createdAt: -1 });
    if (limit) queryExec = queryExec.limit(Number(limit));
    const products = await queryExec;
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add review
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const already = product.reviews.find(r => r.user.toString() === req.user.id);
    if (already) return res.status(400).json({ message: 'You already reviewed this product' });

    const review = { user: req.user.id, name: req.user.name, rating: Number(rating), comment };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.numReviews;
    await product.save();
    res.json({ message: 'Review added', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
