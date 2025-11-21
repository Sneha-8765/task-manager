# 🚀 Task Management Application

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS. Features user registration, personalized dashboards, and full CRUD operations with a mocked backend.

![Task Manager](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.3.5-38B2AC)

## ✨ Features

- 🔐 **User Authentication** - Register and login with JWT tokens
- 📊 **Personalized Dashboard** - Beautiful stats and task overview
- ✅ **Task Management** - Full CRUD operations (Create, Read, Update, Delete)
- 🎨 **Dark/Light Mode** - Toggle between themes
- 📱 **Fully Responsive** - Works on all devices
- 🔍 **Search & Filter** - Find tasks quickly
- 🏷️ **Task Organization** - Priority levels, due dates, and tags
- 💾 **Data Persistence** - LocalStorage for mock data
- 🚀 **Mock Backend** - MSW for API simulation

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Forms**: Formik with Yup validation
- **Icons**: Lucide React
- **API Mocking**: Mock Service Worker (MSW)
- **HTTP Client**: Fetch API

## 📦 Project Structure
task-manager/
├── public/
│ └── mockServiceWorker.js
├── src/
│ ├── components/
│ │ ├── auth/ # Login & Register components
│ │ ├── dashboard/ # Dashboard with stats
│ │ ├── tasks/ # Task-related components
│ │ ├── layout/ # Layout components
│ │ └── ui/ # Reusable UI components
│ ├── store/ # Redux store and slices
│ ├── mocks/ # MSW handlers and mock data
│ ├── types/ # TypeScript definitions
│ ├── hooks/ # Custom React hooks
│ └── utils/ # Utility functions

text

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sneha-8765/task-manager.git
cd task-manager
Install dependencies

bash
npm install
Start the development server

bash
npm run dev
Open your browser
Navigate to http://localhost:5173

Demo Credentials
Username: mike

Password: password123

🎯 How to Use
Register: Create a new account or use demo credentials

Dashboard: View your task statistics and recent tasks

Create Tasks: Add new tasks with title, description, priority, due date, and tags

Manage Tasks: Edit, delete, or change task status

Search & Filter: Find tasks by title, description, or status

🔧 Mock API
The application uses Mock Service Worker (MSW) to simulate backend API calls:

Available Endpoints
POST /api/register - User registration

POST /api/login - User authentication

GET /api/tasks - Fetch user's tasks

POST /api/tasks - Create new task

PUT /api/tasks/:id - Update task

DELETE /api/tasks/:id - Delete task

GET /api/dashboard/stats - Get dashboard statistics

How Mocking Works
MSW intercepts all API requests in development

Returns predefined mock responses with realistic delays

Uses localStorage for data persistence

No actual backend server required

📱 Scripts
bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
🌐 Deployment
Deploy to Vercel (Recommended)
Go to vercel.com

Sign up/login with GitHub

Click "Add New Project"

Select your task-manager repository

Click "Import"

Vercel will automatically deploy your app

You'll get a live URL in 1-2 minutes!

Environment Variables
No environment variables needed! The app works completely offline with mocked APIs.

🧪 Testing
The application includes comprehensive mock data:

Default user: mike / password123

Sample tasks with different statuses and priorities

Persistent data across page refreshes

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License.

🙏 Acknowledgments
Vite for fast development

Tailwind CSS for beautiful styling

Redux Toolkit for state management

MSW for API mocking

Lucide for beautiful icons

⭐ Star this repository if you found it helpful!

text

## Step 2: Save and Commit the New README

```bash
git add README.md
git commit -m "docs: Add comprehensive README with project documentation"
git push
Step 3: Deploy to Vercel (Takes 2 Minutes)
Go to vercel.com

Sign up/login with your GitHub account

Click "Add New Project"

Import your task-manager repository

Click "Deploy"

Vercel will automatically:

Detect it's a Vite/React project

Run npm run build

Deploy to a live URL

Give you something like: https://task-manager-git-main-sneha-8765.vercel.app

Step 4: Update README with Live URL
After deployment, update the README.md with your actual Vercel URL:

Copy your Vercel URL

Add it to the top of README.md under the project title

Commit and push again

bash
git add README.md
git commit -m "docs: Add live demo URL"
git push
Step 5: Final GitHub Repository Setup
Go to your GitHub repository

Add topics: Go to Settings → Topics → Add:

text
react typescript tailwindcss redux msw task-management frontend vite
Add description: "🎯 A beautiful, responsive task management app with user registration, personalized dashboards, and full CRUD operations"