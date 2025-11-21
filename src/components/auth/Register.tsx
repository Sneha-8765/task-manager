import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserPlus, LogIn } from 'lucide-react';
import { loginSuccess } from '../../store/authSlice';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { RegisterData } from '../../types';
import './Auth.css';

const registerSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values: RegisterData) => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/register', {
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
          setError(error || 'Registration failed');
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
              <UserPlus className="auth-icon" />
            </div>
            <h2 className="auth-title">
              Create Account
            </h2>
            <p className="auth-subtitle">
              Join us and start managing your tasks efficiently
            </p>
          </div>
          
          <form className="auth-form" onSubmit={formik.handleSubmit}>
            <div className="name-fields">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName ? formik.errors.firstName : undefined}
                placeholder="John"
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName ? formik.errors.lastName : undefined}
                placeholder="Doe"
              />
            </div>
            
            <div className="form-fields">
              <Input
                label="Username"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username ? formik.errors.username : undefined}
                placeholder="johndoe"
              />
              
              <Input
                label="Email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email ? formik.errors.email : undefined}
                placeholder="john@example.com"
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password ? formik.errors.password : undefined}
                placeholder="••••••••"
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
                'Creating Account...'
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>

            <div className="auth-switch">
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="switch-link"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};