import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './components/dashboard/Dashboard';
import { TaskList } from './components/tasks/TaskList';
import { Layout } from './components/layout/Layout';

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isLogin, setIsLogin] = useState(true);

  if (!isAuthenticated) {
    return isLogin ? (
      <Login onSwitchToRegister={() => setIsLogin(false)} />
    ) : (
      <Register onSwitchToLogin={() => setIsLogin(true)} />
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Dashboard />
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <TaskList />
        </div>
      </div>
    </Layout>
  );
}

export default App;