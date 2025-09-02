import React, { useState } from 'react';

const CurrencyConverter = ({ goHome }) => {
  const [inrAmount, setInrAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [result, setResult] = useState('');

  const exchangeRates = {
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0094,
    SGD: 0.016,
    JPY: 1.85,
    KRW: 16.45,
    AUD: 0.018,
    CAD: 0.016,
    CHF: 0.0115,
    CNY: 0.087,
    AED: 0.044,
    RUB: 1.12,
    THB: 0.42,
    ZAR: 0.21,
    BRL: 0.065,
    MYR: 0.056,
    IDR: 188.45,
    PKR: 3.35,
    BDT: 1.4,
    PHP: 0.70,
  };

  const convertCurrency = () => {
    const amount = parseFloat(inrAmount);
    const rate = exchangeRates[currency];

    if (isNaN(amount)) {
      setResult("Please enter a valid amount.");
      return;
    }

    const converted = (amount * rate).toFixed(2);
    setResult(`${amount} INR = ${converted} ${currency}`);

  };

  return (
    <div style={styles.container}>
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
      <h2>INR Currency Converter</h2>
      <input
        type="number"
        value={inrAmount}
        onChange={(e) => setInrAmount(e.target.value)}
        placeholder="Enter amount in INR"
        style={styles.input}
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        style={styles.select}
      >
        <option value="USD">US Dollar (USD)</option>
        <option value="EUR">Euro (EUR)</option>
        <option value="GBP">British Pound (GBP)</option>
        <option value="SGD">Singapore Dollar (SGD)</option>
        <option value="JPY">Japanese Yen (JPY)</option>
        <option value="KRW">South Korean Won (KRW)</option>
        <option value="AUD">Australian Dollar (AUD)</option>
        <option value="CAD">Canadian Dollar (CAD)</option>
        <option value="CHF">Swiss Franc (CHF)</option>
        <option value="CNY">Chinese Yuan (CNY)</option>
        <option value="AED">UAE Dirham (AED)</option>
        <option value="RUB">Russian Ruble (RUB)</option>
        <option value="THB">Thai Baht (THB)</option>
        <option value="ZAR">South African Rand (ZAR)</option>
        <option value="BRL">Brazilian Real (BRL)</option>
        <option value="MYR">Malaysian Ringgit (MYR)</option>
        <option value="IDR">Indonesian Rupiah (IDR)</option>
        <option value="PKR">Pakistani Rupee (PKR)</option>
        <option value="BDT">Bangladeshi Taka (BDT)</option>
        <option value="PHP">Philippine Peso (PHP)</option>
      </select>
      <button onClick={convertCurrency} style={styles.button}>
        Convert
      </button>
      <div className="result" style={styles.result}>
        {result}
      </div>
    </div>
  );
  function generateHTMLContent() {
  return `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 20px; }
        </style>
      </head>
      <body>
        <h3>Currency Converter View</h3>
        <!-- Your content -->
      </body>
    </html>
  `;
}

  return (
    <div style={{ padding: '20px' }}>
     
      <iframe
        
        
        srcDoc={generateHTMLContent()}
        
      />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial',
    padding: '20px',
    background: '#f3f3f3',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '100%',
  },
  select: {
    padding: '10px',
    margin: '10px 0',
    width: '100%',
  },
  button: {
    padding: '10px',
    margin: '10px 0',
    width: '100%',
    cursor: 'pointer',
  },
  result: {
    marginTop: '20px',
    fontWeight: 'bold',
  },
};

export default CurrencyConverter;
