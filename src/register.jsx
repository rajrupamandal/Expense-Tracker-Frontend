import React, { useState } from 'react';

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ userName: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email && form.password) {
      localStorage.setItem("user", form.email);
      onRegister(form.email);
    }
  };

  const containerStyle = {
    minHeight: '70vh',
    background: 'linear-gradient(to right, #6a11cb, #2575fc)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    overflow: 'hidden'
  };

  const boxStyle = {
    background: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px'
  };

  const inputStyle = {
    padding: '12px',
    fontSize: '15px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    width: '100%',
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#6f42c1',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>📝 Register</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
          <input
            type="text"
            placeholder="Username"
            value={form.userName}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Register</button>
        </form>
      </div>
    </div>
  );
}
