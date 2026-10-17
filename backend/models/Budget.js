const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    monthlyLimit: { type: Number, required: true },
    month: { type: Number, default: () => new Date().getMonth() + 1 },
    year: { type: Number, default: () => new Date().getFullYear() },
    alertThresholdPercent: { type: Number, default: 80 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Budget', BudgetSchema);
