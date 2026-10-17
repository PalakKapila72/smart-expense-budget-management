const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

let localTransactions = [
  { _id: 'tx_01', title: 'Monthly Tech Salary', amount: 65000, type: 'income', category: 'Salary', date: new Date().toISOString(), paymentMethod: 'Net Banking' },
  { _id: 'tx_02', title: 'Apartment Monthly Rent', amount: 18000, type: 'expense', category: 'Housing & Rent', date: new Date().toISOString(), paymentMethod: 'Net Banking' },
  { _id: 'tx_03', title: 'Organic Groceries & Supplies', amount: 4320, type: 'expense', category: 'Food & Dining', date: new Date().toISOString(), paymentMethod: 'Credit Card' },
  { _id: 'tx_04', title: 'Fiber Broadband & Power Bill', amount: 2450, type: 'expense', category: 'Utilities & Bills', date: new Date().toISOString(), paymentMethod: 'UPI', isAiCategorized: true },
  { _id: 'tx_05', title: 'Freelance Web Design Contract', amount: 15000, type: 'income', category: 'Freelancing', date: new Date().toISOString(), paymentMethod: 'UPI' }
];

let localBudgets = [
  { _id: 'bg_01', category: 'Housing & Rent', monthlyLimit: 20000, alertThresholdPercent: 80 },
  { _id: 'bg_02', category: 'Food & Dining', monthlyLimit: 9000, alertThresholdPercent: 80 },
  { _id: 'bg_03', category: 'Utilities & Bills', monthlyLimit: 3500, alertThresholdPercent: 75 },
  { _id: 'bg_04', category: 'Transportation', monthlyLimit: 4000, alertThresholdPercent: 80 }
];

export const fetchTransactions = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions`);
    if (!res.ok) throw new Error();
    const d = await res.json();
    return d.data;
  } catch {
    return [...localTransactions];
  }
};

export const fetchSummary = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions/summary`);
    if (!res.ok) throw new Error();
    const d = await res.json();
    return d.data;
  } catch {
    const totalIncome = localTransactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
    const totalExpense = localTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
    const netSavings = totalIncome - totalExpense;
    return {
      totalIncome,
      totalExpense,
      netSavings,
      savingsRate: totalIncome > 0 ? Number(((netSavings / totalIncome) * 100).toFixed(1)) : 0,
      transactionCount: localTransactions.length
    };
  }
};

export const createTransaction = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/transactions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error();
    const d = await res.json();
    return d.data;
  } catch {
    const item = { _id: 'tx_' + Date.now(), ...data };
    localTransactions.unshift(item);
    return item;
  }
};

export const deleteTransaction = async (id) => {
  try {
    await fetch(`${API_BASE_URL}/transactions/${id}`, { method: 'DELETE' });
  } catch {
    localTransactions = localTransactions.filter(t => t._id !== id);
  }
  return { success: true };
};

export const fetchBudgets = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/budgets`);
    if (!res.ok) throw new Error();
    const d = await res.json();
    return d.data;
  } catch {
    return localBudgets.map(b => ({
      ...b,
      spent: b.category === 'Housing & Rent' ? 18000 : 4320,
      percentageUsed: b.category === 'Housing & Rent' ? 90 : 48,
      status: b.category === 'Housing & Rent' ? 'Warning' : 'On Track'
    }));
  }
};

export const saveBudget = async (data) => {
  localBudgets.push({ _id: 'bg_' + Date.now(), ...data });
  return data;
};

export const deleteBudget = async (id) => {
  localBudgets = localBudgets.filter(b => b._id !== id);
  return { success: true };
};

export const fetchAiInsights = async () => ({
  healthScore: 85,
  summary: 'Your financial portfolio is healthy with a strong positive cash flow.',
  insights: ['Housing rent is 22.5% of income.', 'Discretionary food spending is within limits.'],
  recommendations: ['Allocate ₹10,000 to high-yield SIPs.', 'Keep tracking recurring subscriptions.']
});

export const aiCategorize = async (description) => {
  const d = (description || '').toLowerCase();
  if (d.includes('salary')) return { category: 'Salary', type: 'income' };
  if (d.includes('food') || d.includes('swiggy')) return { category: 'Food & Dining', type: 'expense' };
  if (d.includes('uber') || d.includes('metro')) return { category: 'Transportation', type: 'expense' };
  if (d.includes('rent')) return { category: 'Housing & Rent', type: 'expense' };
  return { category: 'Other', type: 'expense' };
};
