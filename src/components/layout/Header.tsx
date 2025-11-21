import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, Moon, Sun, CheckSquare } from 'lucide-react';
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
    <header className="bg-gradient-to-r from-cyan-500 to-teal-500 shadow-2xl border-b-4 border-cyan-600 dark:border-cyan-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="relative">
                {/* 3D Effect Container */}
                <div className="flex items-center space-x-3">
                  {/* Icon with glow effect */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-50"></div>
                    <CheckSquare className="w-8 h-8 text-white relative z-10 filter drop-shadow-lg" />
                  </div>
                  
                  {/* 3D Text Effect */}
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    <span className="relative inline-block">
                      {/* Main text with shadow for 3D effect */}
                      <span className="relative z-10 bg-gradient-to-b from-white to-cyan-100 bg-clip-text text-transparent filter drop-shadow-lg">
                        Task Manager
                      </span>
                      {/* 3D shadow effect */}
                      <span className="absolute top-1 left-1 bg-gradient-to-b from-cyan-700 to-teal-800 bg-clip-text text-transparent opacity-60 -z-10">
                        Task Manager
                      </span>
                    </span>
                  </h1>
                </div>
                
                {/* Subtle glow effect behind the text */}
                <div className="absolute -inset-4 bg-cyan-400 rounded-lg blur-lg opacity-20 -z-10"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Welcome message with better styling */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
              <span className="text-sm font-semibold text-white drop-shadow-md">
                Welcome, <span className="text-cyan-100">{user?.firstName || user?.username}</span>
              </span>
            </div>
            
            {/* Dark mode toggle with better styling */}
            <Button
              variant="secondary"
              size="sm"
              icon={darkMode ? Sun : Moon}
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
            />
            
            {/* Logout button with better styling */}
            <Button
              variant="secondary"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm hover:text-red-100"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Subtle bottom gradient */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
};