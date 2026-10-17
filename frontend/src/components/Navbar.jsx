import React from 'react';

const Navbar = ({ activeTab, setActiveTab, onOpenAddModal }) => {
  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'transactions', label: '💳 Transactions' },
    { id: 'budgets', label: '🎯 Budgets' },
    { id: 'analytics', label: '📈 Analytics' },
    { id: 'ai', label: '✨ Gemini AI' },
  ];

  return (
    <header style={{
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1f293d',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0 1.5rem'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#fff',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)'
          }}>
            ₹
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              SmartSpend <span style={{ fontSize: '10px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '2px 8px', borderRadius: '999px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>AI</span>
            </div>
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>Smart Expense & Budget Intelligence</div>
          </div>
        </div>

        <nav style={{
          display: 'flex',
          background: 'rgba(17, 24, 39, 0.8)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #1f293d',
          gap: '4px'
        }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: activeTab === t.id ? '#6366f1' : 'transparent',
                color: activeTab === t.id ? '#fff' : '#94a3b8',
                border: 'none',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onOpenAddModal}
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '13px',
            fontWeight: '700',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
          }}
        >
          + Add Record
        </button>
      </div>
    </header>
  );
};

export default Navbar;
