// Simplified Expense Tracker - React + Chart.js (No Tailwind, Mocked Backend)
import React, { useState, useEffect, useCallback } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);






export default function ExpenseTracker({entries, setEntries, goHome }) {
  
  const [form, setForm] = useState({ type: 'expense', amount: '', category: '', date: '', desc: '' });
  const [month, setMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');


  const getEntries = useCallback(async () => {
    // Dummy data to simulate backend
    const dummy = [
      { type: 'income', amount: 5000, category: 'Job', date: '2025-07-01', desc: 'July Salary' },
      { type: 'expense', amount: 2000, category: 'Rent', date: '2025-07-02', desc: 'Monthly Rent' }
    ];
    setEntries(dummy);
  }, []);

  useEffect(() => {
    getEntries();
  }, [getEntries]);

  const addEntry = async (e) => {
    e.preventDefault();
    setEntries(prev => [...prev, form]);
    setForm({ type: 'expense', amount: '', category: '', date: '', desc: '' });
  };

  const income = entries.filter(e => e.type === 'income').reduce((a, e) => a + e.amount, 0);
  const expense = entries.filter(e => e.type === 'expense').reduce((a, e) => a + e.amount, 0);

  const pieValues = entries.filter(e => e.type === 'expense').reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(pieValues),
    datasets: [
      {
        label: 'Expenses',
        data: Object.values(pieValues),
        backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#facc15'],
      },
    ],
  };

  const formStyle = {
    display: 'grid',
    gap: '10px',
    marginBottom: '20px'
  };
  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  };
  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };
  const sectionStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial'
  };

  return (

    


    <div style={sectionStyle}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Expense Tracker</h1>

      <form onSubmit={addEntry} style={formStyle}>
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inputStyle}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input type="number" min="1" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: Number(e.target.value) })} style={inputStyle} required />
        <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle} required />
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={inputStyle} required />
        <input type="text" placeholder="Description" value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} style={inputStyle} />
        <button type="submit" style={buttonStyle}>Add</button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <label>Filter by Month: </label>
        <input type="month" value={month} onChange={e => setMonth(e.target.value)} style={inputStyle} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <p><strong>Income:</strong> ₹{income}</p>
        <p><strong>Expense:</strong> ₹{expense}</p>
        <p><strong>Balance:</strong> ₹{income - expense}</p>
      </div>

      {Object.keys(pieValues).length > 0 && <Pie data={pieData} />}

      <h2 style={{ marginTop: '30px', fontSize: '18px', fontWeight: 'bold' }}>Entries</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>


        <div style={{ marginBottom: '20px' }}>
  <label style={{ marginRight: '10px' }}>Filter by Category:</label>
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    style={{
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    }}
  >
    <option value="All">All</option>
    {[...new Set(entries.map(e => e.category))].map((cat, i) => (
      <option key={i} value={cat}>{cat}</option>
    ))}
  </select>
</div>




        {[...entries]
  .filter(e => selectedCategory === 'All' || e.category === selectedCategory)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .map((e, i) => (
    <li
      key={i}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '10px'
      }}
    >
      {e.date} | {e.category} | ₹{e.amount} ({e.type})
      <div style={{ fontSize: '12px', color: '#666' }}>{e.desc}</div>
    </li>
))}

      </ul>
    </div>
  );
}
