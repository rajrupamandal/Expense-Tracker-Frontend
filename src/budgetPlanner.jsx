import React, { useState, useEffect } from 'react';

export default function BudgetPlanner({ goHome, entries = [] }) {

  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [income, setIncome] = useState('');
  const [budgets, setBudgets] = useState({
    Food: '',
    Rent: '',
    Travel: '',
    Utilities: '',
    Others: ''
  });
  const [actuals, setActuals] = useState({});

  // Load from localStorage on load
  useEffect(() => {
    const saved = localStorage.getItem(`budget-${month}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setIncome(parsed.income);
      setBudgets(parsed.budgets);
      setActuals(parsed.actuals || {});
    }
  }, [month]);

  useEffect(() => {
  const monthPrefix = month; // 'YYYY-MM'
  const monthlyExpenses = entries
    .filter(e => e.type === 'expense' && e.date.startsWith(monthPrefix));

  const totals = {};

  monthlyExpenses.forEach(e => {
    totals[e.category] = (totals[e.category] || 0) + Number(e.amount);
  });

  setActuals(totals);
}, [entries, month]);


  const saveBudget = () => {
    const data = {
      income,
      budgets,
      actuals
    };
    localStorage.setItem(`budget-${month}`, JSON.stringify(data));
    alert('Budget saved!');
  };

  const renderProgress = (category) => {
    const actual = parseFloat(actuals[category]) || 0;
    const planned = parseFloat(budgets[category]) || 0;
    const percent = Math.min((actual / planned) * 100, 100);

    return (
      <div style={{ marginBottom: '20px' }}>
        <strong>{category}</strong> — ₹{actual} / ₹{planned}
        <div style={{ background: '#eee', borderRadius: '10px', overflow: 'hidden', marginTop: '5px' }}>
          <div
            style={{
              height: '12px',
              width: `${percent}%`,
              background: actual > planned ? '#dc3545' : '#28a745',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
        {actual > planned && (
          <div style={{ color: 'red', fontSize: '12px', marginTop: '2px' }}>⚠ Over budget</div>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px', fontFamily: 'Segoe UI' }}>
      <button onClick={goHome} style={{ marginBottom: '20px', backgroundColor: '#6c757d', color: 'white', padding: '10px 16px', border: 'none', borderRadius: '6px' }}>
        ← Back to Home
      </button>

      <h2 style={{ color: '#007bff' }}>📅 Monthly Budget Planner</h2>

      <div style={{ margin: '15px 0' }}>
        <label>Select Month:</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ marginLeft: '10px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Total Income (₹):</label><br />
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          style={{ padding: '8px', width: '100%', borderRadius: '6px', border: '1px solid #ccc' }}
        />
      </div>

      <h4>Set Budget per Category</h4>
      {Object.keys(budgets).map((cat, i) => (
        <div key={i} style={{ marginBottom: '10px' }}>
          <label>{cat}:</label><br />
          <input
            type="number"
            value={budgets[cat]}
            onChange={(e) => setBudgets({ ...budgets, [cat]: e.target.value })}
            style={{ padding: '8px', width: '100%', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>
      ))}

      <button onClick={saveBudget} style={{ padding: '10px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', marginTop: '10px' }}>
        💾 Save Budget
      </button>

      <h3 style={{ marginTop: '30px' }}>📈 Actual Spending vs Budget</h3>
      {Object.keys(budgets).map(cat => renderProgress(cat))}
    </div>
  );
}