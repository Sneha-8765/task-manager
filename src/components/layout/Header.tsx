import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, Moon, Sun } from 'lucide-react';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';
import { Button } from '../ui/Button';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Task Manager
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Welcome, {user?.username}
            </span>
            
            <Button
              variant="secondary"
              size="sm"
              icon={darkMode ? Sun : Moon}
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            />
            
            <Button
              variant="secondary"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};