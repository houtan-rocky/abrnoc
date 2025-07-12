import React from 'react';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/RegisterForm';
import './AuthPage.css';

interface SignupPageProps {
  onNavigateToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigateToLogin }) => {
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
            <h2>Join Cloudzy</h2>
            <p className="auth-subtitle">Create your account and unlock cloud-powered productivity</p>
          </div>
          
          <RegisterForm onSwitchToLogin={onNavigateToLogin} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 