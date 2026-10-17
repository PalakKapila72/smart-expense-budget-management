const express = require('express');
const router = express.Router();

router.post('/insights', (req, res) => {
  res.json({
    success: true,
    data: {
      healthScore: 85,
      summary: 'Optimal financial health with strong surplus reserves and high savings margin.',
      insights: [
        'Housing rent represents 22.5% of income, well below the 30% financial risk line.',
        'Food & Dining has consumed 72% of its allocated budget.'
      ],
      recommendations: [
        'Automate 15% of surplus into a recurring high-yield deposit or index fund.',
        'Cap weekend takeout spending to stay within monthly Food limits.'
      ]
    }
  });
});

router.post('/categorize', (req, res) => {
  const desc = (req.body.description || '').toLowerCase();
  let category = 'Other';
  let type = 'expense';
  if (desc.includes('salary') || desc.includes('freelance')) {
    type = 'income';
    category = desc.includes('salary') ? 'Salary' : 'Freelancing';
  } else if (desc.includes('swiggy') || desc.includes('food') || desc.includes('zomato')) {
    category = 'Food & Dining';
  } else if (desc.includes('uber') || desc.includes('metro') || desc.includes('petrol')) {
    category = 'Transportation';
  } else if (desc.includes('rent')) {
    category = 'Housing & Rent';
  } else if (desc.includes('bill') || desc.includes('electricity') || desc.includes('wifi')) {
    category = 'Utilities & Bills';
  }
  res.json({ success: true, data: { category, type } });
});

module.exports = router;
