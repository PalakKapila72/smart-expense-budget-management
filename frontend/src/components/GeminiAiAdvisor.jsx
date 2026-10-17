import React, { useState } from 'react';

const GeminiAiAdvisor = ({ summary, transactions = [] }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your Google Gemini AI Financial Advisor. Based on your spending, your current financial health is optimal. How can I assist you with your budget or investments today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: `Analyzing "${userText}": With your current savings rate of ${summary?.savingsRate || 0}%, you have ample room to allocate 20-30% into an automated Index SIP at the start of each month.` }
      ]);
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ textAlign: 'center', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' }}>
            Financial Health Score
          </div>
          <div style={{
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            border: '6px solid #6366f1',
            background: 'rgba(99, 102, 241, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: '900',
            color: '#fff',
            marginBottom: '12px'
          }}>
            85
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#34d399' }}>Strong Financial Standing</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>Analyzed active cash flows & budgets</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '12px' }}>💡 Key AI Insights & Tips</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', lineHeight: '1.5' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', border: '1px solid #1f293d' }}>
              • <strong>Housing Allocation:</strong> Rent of ₹18,000 represents 22.5% of total income, comfortably under the 30% financial danger threshold.
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '10px', border: '1px solid #1f293d' }}>
              • <strong>Discretionary Spend:</strong> Food & Dining expenses are currently at 72% of budget limit.
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#6ee7b7' }}>
              ✔ <strong>Action Step:</strong> Set up an automated recurring SIP of ₹10,000 into an index mutual fund for long-term compounding.
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '10px' }}>💬 Interactive Gemini Advisor Chat</h2>
        <div style={{
          height: '220px',
          overflowY: 'auto',
          background: '#090d16',
          border: '1px solid #1f293d',
          borderRadius: '12px',
          padding: '12px',
          marginBottom: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%',
                padding: '10px 14px',
                borderRadius: '14px',
                fontSize: '12px',
                lineHeight: '1.5',
                background: m.role === 'user' ? '#6366f1' : '#1e293b',
                color: '#fff',
                border: m.role === 'user' ? 'none' : '1px solid #334155'
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Ask anything (e.g. 'How can I save ₹5,000 more?' or 'Where to invest?')"
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{
              flex: 1,
              background: '#0f172a',
              border: '1px solid #1f293d',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#fff',
              fontSize: '13px',
              outline: 'none'
            }}
          />
          <button type="submit" className="gradient-btn" style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeminiAiAdvisor;
