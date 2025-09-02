import React, { useState, useEffect } from 'react';
import LandingPage from './landingPage';
import HomePage from './homePage';
import Login from './login';
import Register from './register';
import ExpenseTracker from './ExpenseTracker';
import GoalTracker from './goalTracker';
import BillReminder from './billReminder';
import BudgetPlanner from './budgetPlanner';
import CurrencyConverter from './currency';

export default function RouterController() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('landing'); // landing, login, register, home, tracker
  const [mode, setMode] = useState('login');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      setUser(saved);
      setView('home'); // show main home if already logged in
    }
  }, []);

  const handleLogin = (email) => {
    localStorage.setItem('user', email);
    setUser(email);
    setView('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setView('landing');
  };

  if (!user && (view === 'login' || view === 'register')) {
    return mode === 'login' ? (
      <>
        <Login onLogin={handleLogin} />
        <p style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <button onClick={() => setMode('register')}>Register</button>
        </p>
      </>
    ) : (
      <>
        <Register onRegister={handleLogin} />
        <p style={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <button onClick={() => setMode('login')}>Login</button>
        </p>
      </>
    );
  }

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('login')} />;
  }

  if (view === 'home' && user) {
    return (
      <HomePage
        user={user}
        onLogout={handleLogout}
        onStartTracker={() => setView('tracker')}
        onStartGoals={() => setView('goal')}
        onStartCurrency={() => setView('currency')}
        onStartReminder={() => setView('reminder')}
        onStartBudget={() => setView('budget')}
      />
    );
  }


  if (view === 'goal' && user) {
  return (
    <GoalTracker goHome={() => setView('home')} />
  );
}

if (view === 'currency' && user) {
  return <CurrencyConverter goHome={() => setView('home')} />;
}

if (view === 'reminder' && user) {
  return <BillReminder goHome={() => setView('home')} />;
}

if (view === 'budget') {
  return <BudgetPlanner entries={entries} goHome={() => setView('home')} />;
}



  if (view === 'tracker' && user) {
  return (
    <>
      <div style={{ textAlign: 'left', padding: '10px' }}>
        <button onClick={() => setView('home')}>Back to Home</button> {/* ✅ New button */}
        <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
      </div>
      <ExpenseTracker
  entries={entries}
  setEntries={setEntries}
  goHome={() => setView('home')}
/>

    </>
  );
}


  return <p>Loading...</p>;
}









/*import React, { useState, useEffect } from 'react';
import Login from './login';
import Register from './register';
import HomePage from './homePage';
import ExpenseTracker from './ExpenseTracker';

export default function RouterController() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('login');
  const [view, setView] = useState('home'); 

  useEffect(() => {
    const existingUser = localStorage.getItem('user');
    if (existingUser) setUser(existingUser);
  }, []);

  if (!user) {
    return mode === 'login' ? (
      <>
        <Login onLogin={setUser} />
        <p style={{ textAlign: 'center' }}>
          Don't have an account? <button onClick={() => setMode('register')}>Register</button>
        </p>
      </>
    ) : (
      <>
        <Register onRegister={setUser} />
        <p style={{ textAlign: 'center' }}>
          Already have an account? <button onClick={() => setMode('login')}>Login</button>
        </p>
      </>
    );
  }

  return (
    <>
      <div style={{ textAlign: 'right', padding: '10px' }}>
        <button onClick={() => { localStorage.removeItem('user'); setUser(null); }}>Logout</button>
      </div>
        <ExpenseTracker/>
    </>
  );
}*/
