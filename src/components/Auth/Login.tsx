import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Loader, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowOtp(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === '123456') { // Demo OTP
        const success = await login(email, password);
        if (success) {
          navigate('/');
        } else {
          setError('Login failed after OTP verification');
        }
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    alert('OTP resent successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-white to-green-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl"
      >
        {!showOtp ? (
          <>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-blue-900">Sign in to your account</h2>
              <p className="mt-2 text-sm text-gray-600">
                Access your Election Commission portal
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleInitialSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-blue-900 hover:text-blue-800"
                  >
                    Register here
                  </Link>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Forgot your password?{' '}
                  <Link
                    to="/reset-password"
                    className="font-medium text-blue-900 hover:text-blue-800"
                  >
                    Reset it here
                  </Link>
                </p>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-blue-900">Enter OTP</h2>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a 6-digit code to <strong>{email}</strong>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter 6-Digit OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength={6}
                  required
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    'Verify & Login'
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={loading}
                  className="text-sm text-blue-900 hover:text-blue-800 disabled:opacity-50"
                >
                  Didn't receive OTP? Resend
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  <button
                    type="button"
                    onClick={() => setShowOtp(false)}
                    className="font-medium text-blue-900 hover:text-blue-800"
                  >
                    ← Back to login
                  </button>
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-xs text-green-800 text-center">
                  Demo OTP: 123456 (for testing purposes)
                </p>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Login;