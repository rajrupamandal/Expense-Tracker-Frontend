import React from 'react';

export default function LandingPage({ onStart }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px', fontFamily: 'Arial' }}>
        <img
  src="/budgetbee-logo.png"
  alt="BudgetBee Logo"
  style={{
    width: '250px',
    maxWidth: '100%',
    display: 'block',
    margin: '0 auto 30px',
    borderRadius: '12px'
  }}
/>

      <h1 style={{ fontSize: '40px' }}>Welcome to BudgetBee</h1>
      <p style={{ fontSize: '18px', color: '#666' }}>
        A simple way to track your spending and income.
      </p>
      <button
        onClick={onStart}
        style={{
          marginTop: '30px',
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Get Started
      </button>
    </div>
  );
}
