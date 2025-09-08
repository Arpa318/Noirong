import express from 'express'
import auth from '../middleware/auth.js'
import Order from '../models/Order.js'

const router = express.Router()

// GET /api/orders/my -> list orders for the logged-in user
router.get('/my', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).lean()
  res.json(orders)
})

export default router
