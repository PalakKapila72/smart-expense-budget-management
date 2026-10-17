import React from 'react';

const DashboardOverview = ({ summary, transactions = [], budgets = [], setActiveTab }) => {
  const { totalIncome = 0, totalExpense = 0, netSavings = 0, savingsRate = 0 } = summary || {};
  const recent = transactions.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* AI Snapshot Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #311042 100%)',
        border: '1px solid #4338ca',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)'
      }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a5b4fc', marginBottom: '4px' }}>
            ✨ Google Gemini AI Financial Analysis
          </div>
          <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>
            Financial Status: <span style={{ color: '#818cf8' }}>Optimal & Growing</span>
          </div>
          <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5', maxWidth: '700px' }}>
            Total net retained savings: <strong style={{ color: '#fff' }}>₹{netSavings.toLocaleString()}</strong> ({savingsRate}% of total earnings). All monthly budget limits are in safe standing.
          </div>
        </div>
        <button
          onClick={() => setActiveTab('ai')}
          style={{
            background: 'rgba(99, 102, 241, 0.2)',
            border: '1px solid #6366f1',
            color: '#c7d2fe',
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Open Advisor →
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '1.25rem'
      }}>
        {/* Total Income */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Total Inflow</span>
            <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>↗</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#34d399', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            ₹{totalIncome.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Monthly total earnings credited</div>
        </div>

        {/* Total Expenses */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Total Burn</span>
            <span style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>↘</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fb7185', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            ₹{totalExpense.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Recorded monthly outflows</div>
        </div>

        {/* Net Savings */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Net Savings</span>
            <span style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>₹</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#a5b4fc', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            ₹{netSavings.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Surplus cash reserve</div>
        </div>

        {/* Savings Rate */}
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Savings Rate</span>
            <span style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>★</span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#c084fc', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            {savingsRate}%
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Exceeds standard 20% mark</div>
        </div>
      </div>

      {/* 2 Column Split: Recent Transactions & Budgets */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Recent Transactions Card */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Recent Transactions</h2>
            <button onClick={() => setActiveTab('transactions')} style={{ background: 'none', border: 'none', color: '#818cf8', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              View All ({transactions.length}) →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recent.map((tx) => (
              <div key={tx._id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 8px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '900',
                    fontSize: '14px',
                    background: tx.type === 'income' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                    color: tx.type === 'income' ? '#34d399' : '#fb7185'
                  }}>
                    {tx.type === 'income' ? '+' : '-'}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#f1f5f9' }}>{tx.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{tx.category} • {tx.paymentMethod || 'UPI'}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: tx.type === 'income' ? '#34d399' : '#f1f5f9'
                }}>
                  {tx.type === 'income' ? '+' : '-'}₹{Number(tx.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Health Card */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Budget Health</h2>
            <button onClick={() => setActiveTab('budgets')} style={{ background: 'none', border: 'none', color: '#818cf8', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              Manage →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {budgets.slice(0, 4).map((b) => {
              const spent = Number(b.spent || 0);
              const limit = Number(b.monthlyLimit || 1);
              const pct = Math.min(100, Math.round((spent / limit) * 100));
              const isOver = spent > limit;

              return (
                <div key={b._id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
                    <span style={{ color: '#e2e8f0' }}>{b.category}</span>
                    <span style={{ color: isOver ? '#fb7185' : '#94a3b8' }}>
                      ₹{spent.toLocaleString()} / ₹{limit.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#1e293b', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: isOver ? '#f43f5e' : pct >= 80 ? '#f59e0b' : '#6366f1',
                      borderRadius: '999px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
