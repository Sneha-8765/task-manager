import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  responsive?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  fullWidth = true,
  responsive = true,
  className = '', 
  ...props 
}) => {
  const inputClasses = [
    'input',
    fullWidth ? 'input-full-width' : '',
    responsive ? 'input-responsive' : '',
    error ? 'input-error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`input-container ${fullWidth ? 'input-container-full-width' : ''}`}>
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
};