import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LogIn, UserPlus } from 'lucide-react';
import { loginSuccess } from '../../store/authSlice';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { LoginCredentials } from '../../types';
import './Auth.css';

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

interface LoginProps {
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values: LoginCredentials) => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        if (response.ok) {
          const { user, token } = await response.json();
          dispatch(loginSuccess({ user, token }));
        } else {
          const { error } = await response.json();
          setError(error || 'Login failed');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon-container">
              <LogIn className="auth-icon" />
            </div>
            <h2 className="auth-title">
              Welcome Back
            </h2>
            <p className="auth-subtitle">
              Sign in to your account to continue
            </p>
          </div>
          
          <form className="auth-form" onSubmit={formik.handleSubmit}>
            <div className="form-fields">
              <Input
                label="Username"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username ? formik.errors.username : undefined}
                placeholder="Enter your username"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password ? formik.errors.password : undefined}
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="auth-error">
                <div className="error-text">{error}</div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`auth-submit-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? (
                'Signing In...'
              ) : (
                <>
                  <LogIn size={18} />
                  Sign in
                </>
              )}
            </button>

            <div className="auth-switch">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="switch-link"
              >
                Don't have an account? Sign up
              </button>
            </div>
            
            <div className="demo-credentials">
              <p className="demo-title">Demo credentials:</p>
              <p className="demo-text">
                Username: <span className="demo-highlight">mike</span> | 
                Password: <span className="demo-highlight">password123</span>
              </p>
              <p className="demo-text">
                Username: <span className="demo-highlight">sarah</span> | 
                Password: <span className="demo-highlight">password123</span>
              </p>
              <p className="demo-text">
                Username: <span className="demo-highlight">demo</span> | 
                Password: <span className="demo-highlight">demo123</span>
              </p>
              <p className="demo-text">
                New users: Click "Sign up" to create your account
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};