import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import TransactionList from './components/TransactionList';
import BudgetManager from './components/BudgetManager';
import AnalyticsCharts from './components/AnalyticsCharts';
import GeminiAiAdvisor from './components/GeminiAiAdvisor';
import AddTransactionModal from './components/AddTransactionModal';
import {
  fetchTransactions,
  fetchSummary,
  createTransaction,
  deleteTransaction,
  fetchBudgets,
  saveBudget,
  deleteBudget
} from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [txData, sumData, bgData] = await Promise.all([
        fetchTransactions(),
        fetchSummary(),
        fetchBudgets(),
      ]);
      setTransactions(txData);
      setSummary(sumData);
      setBudgets(bgData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTransaction = async (txData) => {
    await createTransaction(txData);
    await loadData();
  };

  const handleDeleteTransaction = async (id) => {
    await deleteTransaction(id);
    await loadData();
  };

  const handleSaveBudget = async (budgetData) => {
    await saveBudget(budgetData);
    await loadData();
  };

  const handleDeleteBudget = async (id) => {
    await deleteBudget(id);
    await loadData();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#090d16' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      <main style={{ flex: 1, maxWidth: '1240px', width: '100%', margin: '0 auto', padding: '2rem 1.25rem' }}>
        {loading && !summary ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>Loading SmartSpend Dashboard...</div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardOverview
                summary={summary}
                transactions={transactions}
                budgets={budgets}
                setActiveTab={setActiveTab}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            )}

            {activeTab === 'transactions' && (
              <TransactionList
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            )}

            {activeTab === 'budgets' && (
              <BudgetManager
                budgets={budgets}
                onSaveBudget={handleSaveBudget}
                onDeleteBudget={handleDeleteBudget}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsCharts
                summary={summary}
                transactions={transactions}
              />
            )}

            {activeTab === 'ai' && (
              <GeminiAiAdvisor
                summary={summary}
                transactions={transactions}
                budgets={budgets}
              />
            )}
          </>
        )}
      </main>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />

      <footer style={{ borderTop: '1px solid #1f293d', padding: '1.5rem', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
        Smart Expense & Budget Management System • React, Node.js, Express, MongoDB & Google Gemini AI • Palak Kapila
      </footer>
    </div>
  );
}

export default App;
