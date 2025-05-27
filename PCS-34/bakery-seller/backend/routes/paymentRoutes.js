import express from 'express';
import asyncHandler from 'express-async-handler';
import razorpay from '../config/razorpay.js';
const router = express.Router();

router.post(
  '/create-order',
  asyncHandler(async (req, res) => {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay takes amount in paise
      currency: 'INR',
      receipt: `receipt_order_${Math.random() * 1000}`,
    };

    try {
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error('Razorpay error:', error);
      res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
  })
);

export default router;
