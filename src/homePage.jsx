import React from 'react';

export default function HomePage({
  user,
  onLogout,
  onStartTracker,
  onStartGoals,
  onStartCurrency,
  onStartReminder,
  onStartBudget
}) {
  const containerStyle = {
    backgroundColor: '#f1f2f6',
    minHeight: '100vh',
    padding: '50px 20px',
    fontFamily: 'Segoe UI, sans-serif'
  };

  const cardStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: '32px',
    background: 'linear-gradient(to right, #6f42c1, #9b59b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px'
  };

  const descriptionStyle = {
    fontSize: '16px',
    color: '#555',
    marginBottom: '30px'
  };

  const button = {
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#fff',
    width: '100%'
  };

  const buttonGroup = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '30px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Welcome, {user?.split('@')[0]} 👋</h1>

        <p style={descriptionStyle}>What would you like to do today?</p>

        <div style={buttonGroup}>
          <button onClick={onStartTracker} style={{ ...button, backgroundColor: '#6f42c1' }}>
            📊 Expense Tracker
          </button>

          <button onClick={onStartGoals} style={{ ...button, backgroundColor: '#9b59b6' }}>
            🎯 Goal Savings Tracker
          </button>

          <button onClick={onStartCurrency} style={{ ...button, backgroundColor: '#6c5ce7' }}>
            💸 Currency Converter
          </button>

          <button onClick={onStartReminder} style={{ ...button, backgroundColor: '#20c997' }}>
            🔔 Bill Reminder
          </button>

          <button onClick={onStartBudget} style={{ ...button, backgroundColor: '#17a2b8' }}>
            📅 Monthly Budget Planner
          </button>
        </div>

        <button
          onClick={onLogout}
          style={{
            ...button,
            backgroundColor: '#e74c3c',
            width: 'auto',
            padding: '10px 20px',
            fontSize: '14px'
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
