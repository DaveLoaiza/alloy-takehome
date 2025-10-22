import React from 'react';
import './ResultScreen.css';

const ResultScreen = ({ result, onReset }) => {
  const getResultContent = () => {
    switch (result.outcome) {
      case 'Approved':
        return {
          icon: '🎉',
          title: 'Congratulations!',
          message: 'Your application has been approved! Welcome to Scrooge & Marley Counting House.',
          subtitle: 'You can now access your new account and start exploring our services.',
          className: 'success'
        };
      case 'Manual Review':
        return {
          icon: '⏱️',
          title: 'Application Under Review',
          message: 'Thanks for submitting your application! Scrooge & OR Marley will be in touch shortly',
          className: 'review'
        };
      case 'Denied':
        return {
          icon: '😔',
          title: 'Application Not Approved',
          message: 'Sorry, your application was not successful. Mr. Scrooge sends his apologies.',
          className: 'denied'
        };
      default:
        return {
          icon: '⚠️',
          title: 'Something Went Wrong',
          message: 'We encountered an error processing your application.',
          subtitle: result.message || 'Please try again later or contact support if the problem persists.',
          className: 'error'
        };
    }
  };

  const content = getResultContent();

  return (
    <div className={`result-container ${content.className}`}>
      <div className="result-card">
        <div className="result-icon">{content.icon}</div>
        <h1 className="result-title">{content.title}</h1>
        <p className="result-message">{content.message}</p>
        <p className="result-subtitle">{content.subtitle}</p>
        
        <div className="result-actions">
          <button onClick={onReset} className="new-application-button">
            Submit New Application
          </button>
        </div>

        <div className="result-footer">
          <p>Application ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <p>Processed: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;