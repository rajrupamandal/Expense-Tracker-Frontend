import React, { useState } from 'react';

export default function BillReminder({ goHome }) {
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({ name: '', amount: '', dueDate: '' });

  const getDaysLeft = (due) => {
    const today = new Date();
    const dueDate = new Date(due);
    const diff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const addBill = (e) => {
    e.preventDefault();
    setBills([...bills, { ...form, isPaid: false }]);
    setForm({ name: '', amount: '', dueDate: '' });
  };

  const markAsPaid = (index) => {
    const updated = [...bills];
    updated[index].isPaid = true;
    setBills(updated);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Segoe UI' }}>
      <button onClick={goHome} style={{ marginBottom: '20px', backgroundColor: '#6c757d', color: 'white', padding: '10px 16px', border: 'none', borderRadius: '6px' }}>
        ← Back to Home
      </button>

      <h2 style={{ color: '#6f42c1', marginBottom: '10px' }}>🔔 Bill Reminder</h2>

      <form onSubmit={addBill} style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Bill Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#6f42c1', color: 'white', border: 'none', borderRadius: '6px' }}>
          ➕ Add Bill
        </button>
      </form>

      {bills.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No bills added yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bills.map((bill, i) => {
            const daysLeft = getDaysLeft(bill.dueDate);
            const isDueSoon = !bill.isPaid && daysLeft <= 3;
            const isOverdue = !bill.isPaid && daysLeft < 0;

            return (
              <li
                key={i}
                style={{
                  backgroundColor: bill.isPaid ? '#d4edda' : isOverdue ? '#f8d7da' : isDueSoon ? '#fff3cd' : '#ffffff',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '6px',
                  marginBottom: '10px'
                }}
              >
                <strong>{bill.name}</strong> — ₹{bill.amount}<br />
                Due: {bill.dueDate} ({daysLeft >= 0 ? `in ${daysLeft} days` : `${-daysLeft} days ago`})<br />
                {bill.isPaid ? (
                  <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Paid</span>
                ) : (
                  <button
                    onClick={() => markAsPaid(i)}
                    style={{ marginTop: '6px', padding: '6px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Mark as Paid
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}