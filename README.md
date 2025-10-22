# Alloy Takehome Demo

A full-stack Javascript web application for processing financial service applications with integration to the Alloy API for identity verification and approval workflows. Requires basic authentication tokens for Alloy API. Use https://sandbox.alloy.co/v1/parameters/ to find expected format of application evaluation. 

## 🏗️ Project Structure

```
alloy-application-demo/
├── backend/           # Express server
│   ├── server.js      # Main server file
│   ├── package.json   # Backend dependencies
│   └── .env           # Environment variables (you create this)
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ApplicationForm.js
│   │   │   ├── ApplicationForm.css
│   │   │   ├── ResultScreen.js
│   │   │   └── ResultScreen.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json   # Frontend dependencies
│   └── .env           # Frontend environment variables (optional)
└── README.md          # This file
```

## 🚀 Getting Started - Local Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Alloy API credentials (workflow_token and workflow_secret)

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/alloy-application-demo.git
cd alloy-application-demo
```

### Step 2: Set Up the Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
touch .env
```

4. Add your Alloy credentials to `.env`:
```
ALLOY_TOKEN=your_workflow_token_here
ALLOY_SECRET=your_workflow_secret_here
PORT=3001
```

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:3001`

### Step 3: Set Up the Frontend

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000`

### Step 4: Test the Application

- **Manual Review**: Use last name "Review" when submitting an application → Returns "Manual Review"
- **Deny**: Use last name "Deny" when submitting an application → Returns "Denied"

## 🛠️ Technologies Used

- **Frontend**: React, CSS3, Fetch API
- **Backend**: Node.js, Express, Axios
- **API**: Alloy Sandbox API


## 📋 Validation Rules

The form validates:
- First Name: Required
- Last Name: Required
- Email: Required, valid email format
- SSN: Required, exactly 9 digits, no dashes
- Date of Birth: Required, YYYY-MM-DD format
- Address Line 1: Required
- City: Required
- State: Required, 2-letter code (e.g., NY, CA)
- Zip Code: Required, 5 digits or 5+4 format
- Country: Must be "US"

## 📄 License

This project is for demonstration purposes as part of a take-home assignment.