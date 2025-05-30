import { Router } from 'express';
import { CreditService } from '../services/credit.service';
import { authenticateToken } from '../middleware/auth';
import { BadRequestError } from '../utils/errors';

const router = Router();
const creditService = new CreditService();

// Get user's current credits
router.get('/balance', authenticateToken, async (req, res) => {
  try {
    const credits = await creditService.getUserCredits(req.user.id);
    res.json({ credits });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get credit balance' });
  }
});

// Get transaction history
router.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const transactions = await creditService.getTransactionHistory(req.user.id);
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get transaction history' });
  }
});

// Create a new transaction (initiate payment)
router.post('/purchase', authenticateToken, async (req, res) => {
  try {
    const { amount, credits } = req.body;
    
    if (!amount || !credits) {
      throw new BadRequestError('Amount and credits are required');
    }

    const transaction = await creditService.createTransaction(
      req.user.id,
      amount,
      credits
    );

    // TODO: Integrate with payment gateway (e.g., Stripe)
    // For now, we'll simulate a successful payment
    const completedTransaction = await creditService.updateTransactionStatus(
      transaction.id,
      'COMPLETED',
      'simulated_payment_id'
    );

    res.json({ transaction: completedTransaction });
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to process payment' });
    }
  }
});

export default router; 