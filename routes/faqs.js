import express from 'express';

const router = express.Router();

const FAQs = [
  { q: 'How long does shipping take?', a: 'Orders ship within 48 hours and arrive in 3-7 business days.' },
  { q: 'What is the return policy?', a: 'Returns accepted within 30 days in original condition.' },
  { q: 'What payment methods are supported?', a: 'For demo, enter any 6+ digit number to simulate payment.' },
  { q: 'Do I need an account to order?', a: 'Yes, please register to manage your cart and track orders.' },
  { q: 'How can I contact support?', a: 'Email support@noirong.example (demo) or use the contact form (coming soon).' }
];

router.get('/', (req, res) => res.json(FAQs));

export default router;
