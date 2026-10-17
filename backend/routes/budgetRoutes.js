const express = require('express');
const router = express.Router();

let memoryBudgets = [
  { _id: 'bg_1', category: 'Housing & Rent', monthlyLimit: 20000, spent: 18000, percentageUsed: 90, status: 'Warning' },
  { _id: 'bg_2', category: 'Food & Dining', monthlyLimit: 9000, spent: 6470, percentageUsed: 72, status: 'On Track' },
  { _id: 'bg_3', category: 'Utilities & Bills', monthlyLimit: 3500, spent: 2450, percentageUsed: 70, status: 'On Track' },
  { _id: 'bg_4', category: 'Transportation', monthlyLimit: 4000, spent: 1800, percentageUsed: 45, status: 'On Track' }
];

router.get('/', (req, res) => {
  res.json({ success: true, data: memoryBudgets });
});

router.post('/', (req, res) => {
  const { category, monthlyLimit } = req.body;
  const newBg = { _id: 'bg_' + Date.now(), category, monthlyLimit: Number(monthlyLimit), spent: 0, percentageUsed: 0, status: 'On Track' };
  memoryBudgets.push(newBg);
  res.status(201).json({ success: true, data: newBg });
});

router.delete('/:id', (req, res) => {
  memoryBudgets = memoryBudgets.filter(b => b._id !== req.params.id);
  res.json({ success: true });
});

module.exports = router;
