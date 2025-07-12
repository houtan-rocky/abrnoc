import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import './AuthPage.css';

interface LoginPageProps {
  onNavigateToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigateToSignup }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will be handled by parent component
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome to Cloudzy</h2>
            <p className="auth-subtitle">Access your cloud-powered task management platform</p>
          </div>
          
          <LoginForm onSwitchToRegister={onNavigateToSignup} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 