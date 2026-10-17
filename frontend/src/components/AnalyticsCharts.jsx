import React from 'react';

const AnalyticsCharts = ({ summary, transactions = [] }) => {
  const { totalIncome = 0, totalExpense = 0, savingsRate = 0 } = summary || {};

  const categorySpend = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categorySpend[t.category] = (categorySpend[t.category] || 0) + Number(t.amount);
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem' }}>Category Spend Distribution</h2>
        <div>
          {Object.entries(categorySpend).sort((a,b) => b[1] - a[1]).map(([cat, amt]) => {
            const pct = Math.round((amt / (totalExpense || 1)) * 100);
            return (
              <div key={cat} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', color: '#e2e8f0' }}>{cat}</span>
                  <span style={{ color: '#94a3b8' }}>₹{amt.toLocaleString()} ({pct}%)</span>
                </div>
                <div style={{ height: '10px', background: '#1e293b', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '999px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.25rem' }}>Inflow vs. Outflow Burn Ratio</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ fontWeight: '700', color: '#34d399' }}>Total Inflow (Earnings)</span>
              <strong style={{ color: '#34d399' }}>₹{totalIncome.toLocaleString()}</strong>
            </div>
            <div style={{ height: '14px', background: '#1e293b', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '100%', background: '#10b981', borderRadius: '999px' }} />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ fontWeight: '700', color: '#fb7185' }}>Total Outflow (Expenses)</span>
              <strong style={{ color: '#fb7185' }}>₹{totalExpense.toLocaleString()}</strong>
            </div>
            <div style={{ height: '14px', background: '#1e293b', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(100, Math.round((totalExpense / (totalIncome || 1)) * 100))}%`, background: '#f43f5e', borderRadius: '999px' }} />
            </div>
          </div>
        </div>

        <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '12px', fontSize: '12px', lineHeight: '1.6' }}>
          <div><strong>Net Retention Rate:</strong> {savingsRate}% of all income safely saved.</div>
          <div style={{ color: '#94a3b8', marginTop: '4px' }}>Maintaining discretionary expenses under 30% guarantees steady financial growth.</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
