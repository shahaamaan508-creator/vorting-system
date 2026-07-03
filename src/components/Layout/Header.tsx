import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Vote, LogOut, User, Shield, Settings, StickyNote, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/voting', label: 'Vote Now' },
    { path: '/results', label: 'Results' },
    { path: '/live-polls', label: 'Live Polls' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/historical', label: 'History' },
    { path: '/reports', label: 'Reports' },
    { path: '/construction', label: 'Construction' }
  ];

  const supportItems = [
    { path: '/feedback', label: 'Feedback' },
    { path: '/contact', label: 'Contact' },
    { path: '/help-us', label: 'Help Us' }
  ];

  return (
    <header className="bg-gradient-to-r from-orange-500 via-white to-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900 p-2 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Election Commission</h1>
              <p className="text-sm text-blue-700">Government of India</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-900 text-white'
                    : 'text-blue-900 hover:bg-blue-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="relative group">
              <button className="px-2 py-1 rounded-md text-sm font-medium text-blue-900 hover:bg-blue-100 transition-colors">
                Support
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {supportItems.map((item) => (
                  <Link key={item.path} to={item.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-md">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-900">{user.name}</span>
                  {user.role === 'admin' && (
                    <Shield className="h-4 w-4 text-orange-500" />
                  )}
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/notes"
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                    title="My Notes"
                  >
                    <StickyNote className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/settings"
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                    title="Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </Link>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-blue-900 hover:bg-blue-100 rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-blue-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-900 text-white'
                      : 'text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-2 mt-2">
                <p className="px-3 py-1 text-xs font-medium text-gray-500 uppercase">Support</p>
                {supportItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-blue-900 hover:bg-blue-100 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {user && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <Link
                    to="/notes"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-blue-900 hover:bg-blue-100 transition-colors"
                  >
                    My Notes
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-blue-900 hover:bg-blue-100 transition-colors"
                  >
                    Settings
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;