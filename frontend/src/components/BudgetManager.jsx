import React, { useState } from 'react';

const CATEGORIES = ['Food & Dining', 'Housing & Rent', 'Utilities & Bills', 'Transportation', 'Health & Fitness', 'Shopping', 'Other'];

const BudgetManager = ({ budgets = [], onSaveBudget, onDeleteBudget }) => {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [limit, setLimit] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!limit) return;
    onSaveBudget({ category, monthlyLimit: Number(limit) });
    setLimit('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '6px' }}>Configure Category Budget Limits</h2>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '1rem' }}>
          Set monthly expense caps to monitor overspending alerts and maintain healthy cash reserves.
        </div>

        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ background: '#0f172a', border: '1px solid #1f293d', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px', outline: 'none' }}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="number" placeholder="Monthly Limit (₹)" value={limit} onChange={e => setLimit(e.target.value)} style={{ background: '#0f172a', border: '1px solid #1f293d', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px', outline: 'none' }} />
          <button type="submit" className="gradient-btn" style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px' }}>Set Budget</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {budgets.map(b => {
          const spent = Number(b.spent || 0);
          const max = Number(b.monthlyLimit || 1);
          const pct = Math.min(100, Math.round((spent / max) * 100));
          const isOver = spent > max;
          const isWarn = !isOver && pct >= 80;

          return (
            <div key={b._id} className="glass-panel" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>{b.category}</h3>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Cap: ₹{max.toLocaleString()}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    background: isOver ? 'rgba(244, 63, 94, 0.15)' : isWarn ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    color: isOver ? '#fb7185' : isWarn ? '#fbbf24' : '#34d399',
                    border: `1px solid ${isOver ? 'rgba(244, 63, 94, 0.3)' : isWarn ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                  }}>
                    {isOver ? 'Exceeded' : isWarn ? 'Warning (>80%)' : 'On Track'}
                  </span>
                  <button onClick={() => onDeleteBudget(b._id)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px' }}>✕</button>
                </div>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: '#94a3b8' }}>Spent: ₹{spent.toLocaleString()}</span>
                  <span style={{ fontWeight: '700', color: isOver ? '#fb7185' : '#cbd5e1' }}>{pct}%</span>
                </div>
                <div style={{ height: '8px', background: '#1e293b', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: isOver ? '#f43f5e' : isWarn ? '#f59e0b' : '#10b981',
                    borderRadius: '999px',
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>

              <div style={{ fontSize: '11px', color: '#94a3b8', borderTop: '1px solid #1f293d', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Remaining:</span>
                <strong style={{ color: isOver ? '#fb7185' : '#fff' }}>
                  {isOver ? `-₹${(spent - max).toLocaleString()} over` : `₹${(max - spent).toLocaleString()}`}
                </strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetManager;
