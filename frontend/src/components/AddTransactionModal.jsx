import React, { useState } from 'react';
import { aiCategorize } from '../services/api';

const CATEGORIES = [
  'Food & Dining', 'Housing & Rent', 'Utilities & Bills',
  'Transportation', 'Health & Fitness', 'Shopping',
  'Salary', 'Freelancing', 'Investments', 'Other'
];

const AddTransactionModal = ({ isOpen, onClose, onAddTransaction }) => {
  if (!isOpen) return null;

  const [type, setType] = useState('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAiAuto = async () => {
    if (!title.trim()) {
      alert('Please enter a description first (e.g., "Swiggy food" or "Uber trip")');
      return;
    }
    setAiLoading(true);
    try {
      const res = await aiCategorize(title);
      if (res.category) setCategory(res.category);
      if (res.type) setType(res.type);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;
    onAddTransaction({
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      paymentMethod,
      date
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: '#111827',
        border: '1px solid #374151',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #1f293d', paddingBottom: '10px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#fff' }}>Add New Transaction</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '1rem' }}>
            <button
              type="button"
              onClick={() => setType('expense')}
              style={{
                padding: '10px',
                fontSize: '13px',
                fontWeight: '700',
                borderRadius: '10px',
                border: type === 'expense' ? '1px solid #f43f5e' : '1px solid transparent',
                background: type === 'expense' ? 'rgba(244, 63, 94, 0.2)' : '#1e293b',
                color: type === 'expense' ? '#fb7185' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              style={{
                padding: '10px',
                fontSize: '13px',
                fontWeight: '700',
                borderRadius: '10px',
                border: type === 'income' ? '1px solid #10b981' : '1px solid transparent',
                background: type === 'income' ? 'rgba(16, 185, 129, 0.2)' : '#1e293b',
                color: type === 'income' ? '#34d399' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              Income
            </button>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#cbd5e1' }}>
              <span>Description / Title</span>
              <button
                type="button"
                onClick={handleAiAuto}
                style={{ background: 'none', border: 'none', color: '#c084fc', cursor: 'pointer', fontSize: '11px', fontWeight: '700' }}
              >
                {aiLoading ? 'Detecting...' : '✨ Auto-Detect with AI'}
              </button>
            </div>
            <input
              type="text"
              required
              placeholder="e.g. Swiggy food delivery, Metro card"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{
                width: '100%',
                background: '#0f172a',
                border: '1px solid #1f293d',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#cbd5e1' }}>Amount (₹)</label>
              <input
                type="number"
                min="1"
                required
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0f172a',
                  border: '1px solid #1f293d',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#cbd5e1' }}>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0f172a',
                  border: '1px solid #1f293d',
                  borderRadius: '10px',
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#cbd5e1' }}>Payment Method</label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0f172a',
                  border: '1px solid #1f293d',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                {['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: '#cbd5e1' }}>Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0f172a',
                  border: '1px solid #1f293d',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid #1f293d', paddingTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#1f2937',
                color: '#e2e8f0',
                border: '1px solid #374151',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="gradient-btn"
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
