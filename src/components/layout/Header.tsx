import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, Moon, Sun, CheckSquare } from 'lucide-react';
import { RootState } from '../../store';
import { logout } from '../../store/authSlice';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './Header.css';

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
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo Section */}
          <div className="logo-container">
            <div className="logo-glow"></div>
            <div className="logo-icon">
              <div className="icon-glow"></div>
              <CheckSquare className="icon" />
            </div>
            <h1 className="logo-text">
              <span className="text-3d">
                <span className="text-main">Task Manager</span>
                <span className="text-shadow">Task Manager</span>
              </span>
            </h1>
          </div>

          {/* Controls Section */}
          <div className="header-controls">
            {/* Welcome Message */}
            <div className="welcome-message">
              <span className="welcome-text">
                Welcome, <span className="welcome-name">{user?.firstName || user?.username}</span>
              </span>
            </div>
            
            {/* Control Buttons */}
            <div className="control-buttons">
              {/* Dark Mode Toggle */}
              <button
                className="control-btn"
                onClick={toggleDarkMode}
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span className="btn-text">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
              
              {/* Logout Button */}
              <button
                className="control-btn logout"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={18} />
                <span className="btn-text">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};