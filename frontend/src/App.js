import React, { useState } from 'react';
import './App.css';
import ApplicationForm from './components/ApplicationForm';
import ResultScreen from './components/ResultScreen';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/submit-application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult({
          outcome: data.outcome,
          success: true
        });
      } else {
        setResult({
          outcome: 'Error',
          success: false,
          message: data.details || 'An error occurred'
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setResult({
        outcome: 'Error',
        success: false,
        message: 'Failed to connect to the server'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="App">
      {!result ? (
        <ApplicationForm onSubmit={handleSubmit} loading={loading} />
      ) : (
        <ResultScreen result={result} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;