let GoogleGenerativeAI;
try {
  GoogleGenerativeAI = require('@google/generative-ai').GoogleGenerativeAI;
} catch (e) {
  GoogleGenerativeAI = null;
}

const getApiKey = () => process.env.GEMINI_API_KEY;

const generateFinancialInsights = async (transactions, budgets) => {
  const apiKey = getApiKey();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netSavings = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;

  const categoryBreakdown = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + Number(t.amount);
    });

  // Built-in intelligent rule fallback if API key or SDK is not ready
  if (!apiKey || apiKey === 'your_gemini_api_key_here' || !GoogleGenerativeAI) {
    const topCategory = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0] || ['General', 0];
    return {
      source: 'smart-rule-advisor',
      summary: `Total income is ₹${totalIncome.toLocaleString()} and expenses are ₹${totalExpense.toLocaleString()}, resulting in a ${savingsRate}% net savings rate.`,
      insights: [
        `Highest expenditure is in "${topCategory[0]}" accounting for ₹${topCategory[1].toLocaleString()}. Consider setting a hard cap.`,
        savingsRate >= 20
          ? `Great job! Your savings rate of ${savingsRate}% adheres to healthy 50/30/20 guidelines.`
          : `Savings rate is currently at ${savingsRate}%. Target at least 20% to build an emergency fund.`,
        `You have ${budgets.length} active budget caps configured.`
      ],
      recommendations: [
        'Automate 15-20% of income into an index fund or high-yield deposit at the start of each month.',
        'Review dining out and delivery orders to keep discretionary spend under 12% of total income.',
        'Build an emergency buffer of 3-6 months worth of essential living expenses.'
      ],
      healthScore: Math.min(100, Math.max(20, Math.round(Number(savingsRate) * 1.8 + 30)))
    };
  }

  // Live Google Gemini API call
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are a personal finance advisor. Analyze this data:
Income: ₹${totalIncome}, Expenses: ₹${totalExpense}, Net Savings: ₹${netSavings} (Savings Rate: ${savingsRate}%)
Expenses by category: ${JSON.stringify(categoryBreakdown)}

Respond ONLY with valid JSON (no markdown backticks):
{
  "summary": "1-2 sentence overall assessment",
  "healthScore": 85,
  "insights": ["Observation 1", "Observation 2", "Observation 3"],
  "recommendations": ["Actionable tip 1", "Actionable tip 2", "Actionable tip 3"]
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim().replace(/^```json\s*/, '').replace(/```$/, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini API notice:', error.message);
    return {
      source: 'advisor-fallback',
      summary: `Analyzed ${transactions.length} records. Cash flow is positive with ₹${netSavings.toLocaleString()} retained.`,
      insights: ['Review discretionary dining to stay strictly within allocated limits.'],
      recommendations: ['Maintain an emergency fund of 3-6 months living expenses.'],
      healthScore: 80
    };
  }
};

const categorizeTransaction = async (description, amount) => {
  const desc = (description || '').toLowerCase();
  let category = 'Other';
  let type = 'expense';

  if (desc.includes('salary') || desc.includes('stipend') || desc.includes('freelance')) {
    type = 'income';
    category = desc.includes('salary') ? 'Salary' : 'Freelancing';
  } else if (desc.includes('swiggy') || desc.includes('zomato') || desc.includes('food') || desc.includes('dinner') || desc.includes('grocery')) {
    category = 'Food & Dining';
  } else if (desc.includes('uber') || desc.includes('ola') || desc.includes('metro') || desc.includes('petrol') || desc.includes('fuel')) {
    category = 'Transportation';
  } else if (desc.includes('rent') || desc.includes('flat')) {
    category = 'Housing & Rent';
  } else if (desc.includes('bill') || desc.includes('wifi') || desc.includes('electricity') || desc.includes('recharge')) {
    category = 'Utilities & Bills';
  } else if (desc.includes('amazon') || desc.includes('myntra') || desc.includes('flipkart') || desc.includes('shop')) {
    category = 'Shopping';
  } else if (desc.includes('gym') || desc.includes('medicine') || desc.includes('doctor')) {
    category = 'Health & Fitness';
  }

  return { category, type };
};

module.exports = { generateFinancialInsights, categorizeTransaction };
