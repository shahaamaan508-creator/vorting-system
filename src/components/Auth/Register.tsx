import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Lock, CreditCard, Loader, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    voterId: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationStep, setVerificationStep] = useState(1);
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  
  const { register, verifyVoter } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVerifyVoter = async () => {
    if (!formData.voterId) {
      setError('Please enter your Voter ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const isValid = await verifyVoter(formData.voterId);
      if (isValid) {
        setIsVerified(true);
        setVerificationStep(2);
      } else {
        setError('Invalid Voter ID. Please check and try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowOtp(true);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    if (otp === '123456') { // Demo OTP
      setShowOtp(false);
      setError('');
      alert('Email verified successfully!');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (showOtp) {
      setError('Please verify your email with OTP first');
      return;
    }

    if (!isVerified) {
      setError('Please verify your Voter ID first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        voterId: formData.voterId,
        isVerified: true,
        role: 'voter'
      });

      if (success) {
        navigate('/');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-white to-green-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl"
      >
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-blue-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the Election Commission portal
          </p>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              verificationStep >= 1 ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${
              verificationStep >= 2 ? 'bg-blue-900' : 'bg-gray-200'
            }`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              verificationStep >= 2 ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              2
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {verificationStep === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="voterId" className="block text-sm font-medium text-gray-700">
                Voter ID Number
              </label>
              <div className="mt-1 relative">
                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="voterId"
                  name="voterId"
                  type="text"
                  required
                  className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your Voter ID"
                  value={formData.voterId}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Verification
              </label>
              {!showOtp ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading || !formData.email}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <Loader className="h-5 w-5 animate-spin mx-auto" />
                  ) : (
                    'Send Email OTP'
                  )}
                </button>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Verify OTP
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Resend
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleVerifyVoter}
              disabled={loading || !formData.voterId}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : isVerified ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Verified
                </>
              ) : (
                'Verify Voter ID'
              )}
            </button>

            {showOtp && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mt-4">
                <p className="text-sm">Demo OTP: 123456 (for testing purposes)</p>
              </div>
            )}

            {isVerified && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Voter ID verified successfully!
                </div>
              </div>
            )}
          </div>
        )}

        {verificationStep === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-900 hover:text-blue-800"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;