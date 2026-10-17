const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const { getDbStatus } = require('../config/db');

let memoryTransactions = [
  { _id: 'tx_1', title: 'Monthly Salary Credit', amount: 65000, type: 'income', category: 'Salary', date: new Date().toISOString(), paymentMethod: 'Net Banking' },
  { _id: 'tx_2', title: 'Apartment Monthly Rent', amount: 18000, type: 'expense', category: 'Housing & Rent', date: new Date().toISOString(), paymentMethod: 'Net Banking' },
  { _id: 'tx_3', title: 'Supermarket Groceries', amount: 4320, type: 'expense', category: 'Food & Dining', date: new Date().toISOString(), paymentMethod: 'Credit Card' },
  { _id: 'tx_4', title: 'Broadband & Electricity', amount: 2450, type: 'expense', category: 'Utilities & Bills', date: new Date().toISOString(), paymentMethod: 'UPI' },
  { _id: 'tx_5', title: 'Freelance Design Milestone', amount: 15000, type: 'income', category: 'Freelancing', date: new Date().toISOString(), paymentMethod: 'UPI' }
];

router.get('/', async (req, res) => {
  if (getDbStatus()) {
    const list = await Transaction.find().sort({ date: -1 });
    return res.json({ success: true, data: list });
  }
  res.json({ success: true, data: memoryTransactions });
});

router.get('/summary', async (req, res) => {
  const list = getDbStatus() ? await Transaction.find() : memoryTransactions;
  const totalIncome = list.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const totalExpense = list.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;
  res.json({ success: true, data: { totalIncome, totalExpense, netSavings, savingsRate: Number(savingsRate), transactionCount: list.length } });
});

router.post('/', async (req, res) => {
  const { title, amount, type, category, date, paymentMethod, notes } = req.body;
  const payload = { title, amount: Number(amount), type: type || 'expense', category: category || 'Other', date: date || new Date(), paymentMethod: paymentMethod || 'UPI', notes: notes || '' };
  if (getDbStatus()) {
    const created = await Transaction.create(payload);
    return res.status(201).json({ success: true, data: created });
  }
  const item = { _id: 'tx_' + Date.now(), ...payload };
  memoryTransactions.unshift(item);
  res.status(201).json({ success: true, data: item });
});

router.delete('/:id', async (req, res) => {
  if (getDbStatus()) {
    await Transaction.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
  }
  memoryTransactions = memoryTransactions.filter(t => t._id !== req.params.id);
  res.json({ success: true });
});

module.exports = router;
