const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Submit application to Alloy
app.post('/api/submit-application', async (req, res) => {
  try {
    const formData = req.body;

    // Format data for Alloy API
    const alloyPayload = {
      name_first: formData.firstName,
      name_last: formData.lastName,
      address_line_1: formData.addressLine1,
      address_line_2: formData.addressLine2 || '',
      address_city: formData.city,
      address_state: formData.state,
      address_postal_code: formData.zipCode,
      address_country_code: formData.country,
      document_ssn: formData.ssn,
      email_address: formData.email,
      birth_date: formData.dateOfBirth
    };

    console.log('Submitting to Alloy:', alloyPayload);

    // Make request to Alloy API
    const response = await axios.post(
      'https://sandbox.alloy.co/v1/evaluations/',
      alloyPayload,
      {
        auth: {
          username: process.env.ALLOY_TOKEN,
          password: process.env.ALLOY_SECRET
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Alloy response:', response.data);

    // Extract outcome
    const outcome = response.data.summary?.outcome || 'Unknown';

    res.json({
      success: true,
      outcome: outcome,
      fullResponse: response.data
    });

  } catch (error) {
    console.error('Error submitting application:', error.response?.data || error.message);
    
    res.status(error.response?.status || 500).json({
      success: false,
      error: 'Failed to submit application',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});