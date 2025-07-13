import { useState, useEffect } from 'react';
import './App.css';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<'login' | 'signup' | 'dashboard'>('login');

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
      // Update URL to dashboard
      if (window.location.pathname !== '/dashboard') {
        window.history.pushState({}, '', '/dashboard');
      }
    } else {
      // Check current URL path
      const path = window.location.pathname;
      if (path === '/register' || path === '/signup') {
        setCurrentPage('signup');
      } else if (path === '/login') {
        setCurrentPage('login');
      } else {
        // Default to login and update URL
        setCurrentPage('login');
        if (path !== '/login') {
          window.history.pushState({}, '', '/login');
        }
      }
    }
  }, [isAuthenticated]);

  const navigateTo = (page: 'login' | 'signup' | 'dashboard') => {
    setCurrentPage(page);
    const path = page === 'signup' ? '/register' : `/${page}`;
    window.history.pushState({}, '', path);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (isAuthenticated) {
        if (path === '/dashboard') {
          setCurrentPage('dashboard');
        } else {
          // Redirect to dashboard if authenticated
          window.history.pushState({}, '', '/dashboard');
          setCurrentPage('dashboard');
        }
      } else {
        if (path === '/register' || path === '/signup') {
          setCurrentPage('signup');
        } else if (path === '/login') {
          setCurrentPage('login');
        } else {
          // Redirect to login if not authenticated
          window.history.pushState({}, '', '/login');
          setCurrentPage('login');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  switch (currentPage) {
    case 'login':
      return <LoginPage onNavigateToSignup={() => navigateTo('signup')} />;
    case 'signup':
      return <SignupPage onNavigateToLogin={() => navigateTo('login')} />;
    case 'dashboard':
      return <DashboardPage />;
    default:
      return <LoginPage onNavigateToSignup={() => navigateTo('signup')} />;
  }
}

export default App;
