import React, { useState } from 'react';

const CATEGORIES = [
  'All', 'Food & Dining', 'Housing & Rent', 'Utilities & Bills',
  'Transportation', 'Entertainment', 'Health & Fitness', 'Shopping',
  'Education', 'Salary', 'Freelancing', 'Investments', 'Other'
];

const TransactionList = ({ transactions = [], onDeleteTransaction, onOpenAddModal }) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('All');

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesCat = filterCategory === 'All' || t.category === filterCategory;
    return matchesSearch && matchesType && matchesCat;
  });

  const handleExportCSV = () => {
    const headers = 'Title,Type,Category,Amount,PaymentMethod,Date\n';
    const rows = filtered.map(t => `"${t.title}",${t.type},"${t.category}",${t.amount},"${t.paymentMethod || 'UPI'}","${t.date}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Transaction History</h2>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Filter, search, categorize, and download CSV report</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleExportCSV}
              style={{
                background: '#1e293b',
                color: '#cbd5e1',
                border: '1px solid #334155',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              📥 Export CSV
            </button>
            <button
              onClick={onOpenAddModal}
              className="gradient-btn"
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              + Add Record
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <input
            type="text"
            placeholder="Search descriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: '#0f172a',
              border: '1px solid #1f293d',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#fff',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              background: '#0f172a',
              border: '1px solid #1f293d',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#fff',
              fontSize: '13px',
              outline: 'none'
            }}
          >
            <option value="all">All Flow Types</option>
            <option value="expense">Expenses Only</option>
            <option value="income">Income Only</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              background: '#0f172a',
              border: '1px solid #1f293d',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#fff',
              fontSize: '13px',
              outline: 'none'
            }}
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Payment</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t._id}>
                <td style={{ fontWeight: '700', color: '#f1f5f9' }}>{t.title}</td>
                <td>
                  <span style={{ background: '#1e293b', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', color: '#cbd5e1' }}>
                    {t.category}
                  </span>
                </td>
                <td style={{ color: '#94a3b8' }}>{t.paymentMethod || 'UPI'}</td>
                <td style={{ color: '#94a3b8' }}>{new Date(t.date).toLocaleDateString()}</td>
                <td style={{ textAlign: 'right', fontWeight: '800' }}>
                  <span style={{ color: t.type === 'income' ? '#34d399' : '#f1f5f9' }}>
                    {t.type === 'income' ? '+' : '-'}₹{Number(t.amount).toLocaleString()}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete transaction "${t.title}"?`)) {
                        onDeleteTransaction(t._id);
                      }
                    }}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '16px' }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
