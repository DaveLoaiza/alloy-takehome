import React, { useState } from 'react';
import './ApplicationForm.css';

const ApplicationForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    ssn: '',
    email: '',
    dateOfBirth: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    
    // State validation (2 letter code)
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    } else if (!/^[A-Z]{2}$/.test(formData.state)) {
      newErrors.state = 'State must be a 2-letter code (e.g., NY, CA)';
    }

    // Zip code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid zip code format';
    }

    // Country validation
    if (formData.country !== 'US') {
      newErrors.country = 'Country must be US';
    }

    // SSN validation (9 digits, no dashes)
    if (!formData.ssn.trim()) {
      newErrors.ssn = 'SSN is required';
    } else if (!/^\d{9}$/.test(formData.ssn)) {
      newErrors.ssn = 'SSN must be exactly 9 digits with no dashes';
    }

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Date of birth validation (YYYY-MM-DD)
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Date must be in YYYY-MM-DD format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Scrooge & Marley Counting House Loan Application</h1>
        <p>Apply for your loan in minutes</p>
      </div>

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-section">
          <h2>Personal Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth (YYYY-MM-DD) *</label>
              <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="1990-01-15"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="ssn">Social Security Number (9 digits, no dashes) *</label>
            <input
              type="text"
              id="ssn"
              name="ssn"
              placeholder="123456789"
              maxLength="9"
              value={formData.ssn}
              onChange={handleChange}
              className={errors.ssn ? 'error' : ''}
            />
            {errors.ssn && <span className="error-message">{errors.ssn}</span>}
          </div>
        </div>

        <div className="form-section">
          <h2>Address</h2>

          <div className="form-group">
            <label htmlFor="addressLine1">Address Line 1 *</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              className={errors.addressLine1 ? 'error' : ''}
            />
            {errors.addressLine1 && <span className="error-message">{errors.addressLine1}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="addressLine2">Address Line 2</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State (2-letter code) *</label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="NY"
                maxLength="2"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'error' : ''}
                style={{ textTransform: 'uppercase' }}
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code *</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="10001"
                value={formData.zipCode}
                onChange={handleChange}
                className={errors.zipCode ? 'error' : ''}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                readOnly
                className="readonly"
              />
              {errors.country && <span className="error-message">{errors.country}</span>}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;