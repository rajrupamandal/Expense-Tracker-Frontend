import React, { useState } from 'react';

export default function GoalTracker({ goHome }) {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', saved: 0 });
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [saving, setSaving] = useState('');

  const addGoal = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target) return;
    setGoals([...goals, { ...newGoal, target: Number(newGoal.target), saved: 0 }]);
    setNewGoal({ name: '', target: '', saved: 0 });
    setSelectedGoal(null);
  };

  const selectGoal = (goal) => {
    setSelectedGoal(goal);
    setSaving('');
  };

  const addSaving = () => {
    const updated = goals.map((g) =>
      g === selectedGoal ? { ...g, saved: g.saved + Number(saving) } : g
    );
    setGoals(updated);
    setSelectedGoal({ ...selectedGoal, saved: selectedGoal.saved + Number(saving) });
    setSaving('');
  };

  const isAchieved = (goal) => goal.saved >= goal.target;

  return (
    
    <div style={{ backgroundColor: '#f1f2f6', minHeight: '100vh', padding: '40px 20px' }}>


    <button
  onClick={goHome}
  style={{
    marginBottom: '20px',
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 16px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }}
>
  ← Back to Home
</button>



      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#6f42c1',
          fontSize: '24px',
          marginBottom: '30px'
        }}>
          🎯 Goal Savings Tracker
        </h2>

        <form onSubmit={addGoal} style={{ display: 'grid', gap: '15px' }}>
          <input
            type="text"
            placeholder="E.g., Buy a Dress"
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            style={{
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            required
          />
          <input
            type="number"
            placeholder="E.g., 1000"
            value={newGoal.target}
            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
            style={{
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#6f42c1',
              color: 'white',
              padding: '12px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Add Goal
          </button>
        </form>

        <div style={{ marginTop: '30px' }}>
          {goals.map((goal, i) => (
            <button
              key={i}
              onClick={() => selectGoal(goal)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '10px',
                textAlign: 'left',
                borderRadius: '6px',
                border: '1px solid #6f42c1',
                backgroundColor: 'white',
                color: '#6f42c1',
                fontSize: '16px'
              }}
            >
              {goal.name} {isAchieved(goal) && '✅ (Achieved)'}
            </button>
          ))}
        </div>

        {selectedGoal && (
          <div style={{
            marginTop: '25px',
            backgroundColor: '#f8f0ff',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #e0c7ff'
          }}>
            <h4 style={{ color: '#6f42c1', marginBottom: '10px' }}>
              🎯 Goal: {selectedGoal.name}
            </h4>
            <p style={{ fontSize: '16px' }}>
              Total Saved: ₹{selectedGoal.saved.toFixed(2)} / ₹{selectedGoal.target.toFixed(2)}
            </p>

            {isAchieved(selectedGoal) && (
              <div style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '10px',
                borderRadius: '6px',
                fontSize: '15px',
                marginTop: '10px'
              }}>
                🎉 Congratulations! You've achieved your goal.
              </div>
            )}

            {!isAchieved(selectedGoal) && (
              <>
                <input
                  type="number"
                  placeholder="Add Saving"
                  value={saving}
                  onChange={(e) => setSaving(e.target.value)}
                  style={{
                    marginTop: '15px',
                    padding: '10px',
                    width: '100%',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '6px'
                  }}
                />
                <button
                  onClick={addSaving}
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    backgroundColor: '#6f42c1',
                    color: 'white',
                    padding: '10px',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  💰 Add Saving
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
