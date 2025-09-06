# Phase 1: Quickstart Guide

This guide provides the steps to set up the development environment for the "918 Runs Shader MVP" feature.

## Prerequisites
- [Node.js](https://nodejs.org/) (LTS version)
- [pnpm](https://pnpm.io/installation) package manager

## 1. Project Setup
Follow these steps to create the initial Vite project and install all necessary dependencies.

```bash
# 1. Create the Vite + React project
pnpm create vite@latest 918-runs-shader --template react

# 2. Navigate into the new project directory
cd 918-runs-shader

# 3. Install core dependencies
pnpm i @paper-design/shaders-react react-hook-form zod axios

# 4. Install development dependencies
pnpm i -D prettier eslint
```

## 2. Component Scaffolding
Set up the directory structure and copy the required micro-interaction components.

```bash
# 1. Create the component and hooks directories
mkdir -p src/components/common src/hooks src/styles src/api

# 2. Download ReactBits components (example using curl)
# Replace with actual URLs or manual copy-paste from reactbits.dev
curl -o src/components/common/MagneticButton.jsx https://reactbits.dev/path/to/MagneticButton.jsx
curl -o src/components/common/GlassCard.jsx https://reactbits.dev/path/to/GlassCard.jsx
# ... add other bits as needed

# 3. Create placeholder files for main components
touch src/components/Hero.jsx
touch src/components/RegisterForm.jsx
touch src/components/SessionCalendar.jsx
touch src/components/Gallery.jsx
touch src/components/Newsletter.jsx
touch src/hooks/useCloudinaryGallery.js
touch src/hooks/useButtondownSubscribe.js
touch src/styles/theme.css
```

## 3. Serverless Function
Create the Vercel serverless function that will handle form submissions.

**File: `api/submit.js`**
```javascript
import { RegistrationSchema } from '../src/data/schemas'; // Adjust path as needed
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const validation = RegistrationSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ success: false, message: 'Invalid data', errors: validation.error.issues });
  }

  const { playerEmail, parentEmail, playerName, improvementGoals } = validation.data;
  
  try {
    // Add subscriber to Buttondown
    await axios.post('https://api.buttondown.email/v1/subscribers', {
      email: parentEmail, // Use parent's email for primary contact
      metadata: {
        playerName: playerName,
        goals: improvementGoals.join(', ')
      },
      tags: ['918Runs']
    }, {
      headers: { 'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}` }
    });

    // In a real app, you would also save the registration data.
    // For this zero-DB setup, we just log it or send it somewhere.
    console.log('Successful registration:', validation.data);

    res.status(200).json({ success: true, message: 'Registration successful!' });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, message: 'An internal error occurred.' });
  }
}
```

## 4. Running Locally
To start the development server:
```bash
pnpm dev
```
The application will be available at `http://localhost:5173`. The serverless function can be tested by POSTing to `http://localhost:5173/api/submit`.
