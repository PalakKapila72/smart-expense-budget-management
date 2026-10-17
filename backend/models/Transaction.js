const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['expense', 'income'], default: 'expense' },
    category: { type: String, required: true, default: 'Other' },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String, default: 'UPI' },
    notes: { type: String, default: '' },
    isAiCategorized: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
