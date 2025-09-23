import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { setToken } from '../../services/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './LoginForm';
import TestCredentials from '../TestCredentials';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken: setAuthContextToken } = useAuth();

  const handleChange = (e) => {
    setError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.username.trim()) {
      setError('Username is required.');
      return;
    }
    
    if (!formData.password.trim()) {
      setError('Password is required.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const data = await login(formData);
      console.log('Login successful', data);
      setToken(data);
      setAuthContextToken(data.access);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid username or password.');
        } else if (err.response.status === 400) {
          setError(err.response.data?.error || 'Invalid input. Please check your credentials.');
        } else if (err.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(err.response.data?.error || 'Login failed. Please try again.');
        }
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            
            <TestCredentials />
            
            <LoginForm
              formData={formData}
              error={error}
              loading={loading}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
