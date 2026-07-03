import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Vote, Shield, Users, TrendingUp, BarChart3, Calendar, FileText, 
  Construction, MessageSquare, Settings, StickyNote, Phone, Heart,
  Bell, Award, Clock, MapPin, Zap, Globe, BookOpen, Target,
  CheckCircle, AlertCircle, Activity, PieChart, Database, ChevronUp, ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const { user } = useAuth();
  const [dashboardCollapsed, setDashboardCollapsed] = React.useState(false);

  const quickAccessItems = [
    { path: '/voting', label: 'Vote Now', icon: Vote, color: 'bg-red-500', urgent: true },
    { path: '/results', label: 'Results', icon: TrendingUp, color: 'bg-green-500' },
    { path: '/live-polls', label: 'Live Polls', icon: Activity, color: 'bg-blue-500' },
    { path: '/analytics', label: 'Analytics', icon: BarChart3, color: 'bg-purple-500' },
    { path: '/historical', label: 'History', icon: Calendar, color: 'bg-orange-500' },
    { path: '/reports', label: 'Reports', icon: FileText, color: 'bg-indigo-500' },
    { path: '/construction', label: 'Construction', icon: Construction, color: 'bg-yellow-600' },
    { path: '/notes', label: 'My Notes', icon: StickyNote, color: 'bg-pink-500', authRequired: true },
  ];

  const supportItems = [
    { path: '/feedback', label: 'Feedback', icon: MessageSquare, color: 'bg-teal-500' },
    { path: '/contact', label: 'Contact', icon: Phone, color: 'bg-cyan-500' },
    { path: '/help-us', label: 'Help Us', icon: Heart, color: 'bg-rose-500' },
    { path: '/settings', label: 'Settings', icon: Settings, color: 'bg-gray-600', authRequired: true },
  ];

  const newFeatures = [
    {
      id: 'voter-education',
      title: 'Voter Education Hub',
      description: 'Learn about voting process, candidate information, and electoral procedures',
      icon: BookOpen,
      color: 'bg-blue-600',
      path: '/education',
      status: 'New'
    },
    {
      id: 'election-calendar',
      title: 'Election Calendar',
      description: 'Stay updated with upcoming elections, important dates, and deadlines',
      icon: Calendar,
      color: 'bg-green-600',
      path: '/calendar',
      status: 'Popular'
    },
    {
      id: 'candidate-profiles',
      title: 'Candidate Profiles',
      description: 'Detailed information about candidates, their manifestos, and track records',
      icon: Users,
      color: 'bg-purple-600',
      path: '/candidates',
      status: 'Updated'
    },
    {
      id: 'polling-locator',
      title: 'Polling Station Locator',
      description: 'Find your nearest polling station with directions and facility information',
      icon: MapPin,
      color: 'bg-orange-600',
      path: '/locator',
      status: 'Essential'
    },
    {
      id: 'election-news',
      title: 'Election News & Updates',
      description: 'Latest news, announcements, and updates from the Election Commission',
      icon: Bell,
      color: 'bg-red-600',
      path: '/news',
      status: 'Live'
    },
    {
      id: 'voter-verification',
      title: 'Voter ID Verification',
      description: 'Verify your voter registration status and update your information',
      icon: CheckCircle,
      color: 'bg-teal-600',
      path: '/verify',
      status: 'Secure'
    }
  ];

  const stats = [
    { label: 'Registered Voters', value: '91.5 Cr', icon: Users, color: 'text-blue-600' },
    { label: 'Active Elections', value: '12', icon: Vote, color: 'text-green-600' },
    { label: 'Polling Stations', value: '10.5 L', icon: MapPin, color: 'text-purple-600' },
    { label: 'Digital Initiatives', value: '25+', icon: Zap, color: 'text-orange-600' }
  ];

  return (
    <div 
      className="relative min-h-screen bg-gradient-to-b from-orange-400 via-white to-green-400"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url('https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Quick Access Dashboard */}
      <div className="bg-white shadow-lg border-b-4 border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-blue-900">Quick Access Dashboard</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDashboardCollapsed(!dashboardCollapsed)}
                className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md transition-colors"
              >
                {dashboardCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                <span className="text-sm">{dashboardCollapsed ? 'Show' : 'Hide'}</span>
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="h-4 w-4" />
                <span>All Services Available 24/7</span>
              </div>
            </div>
          </div>
          
          {!dashboardCollapsed && (
            <>
              {/* Main Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
                {quickAccessItems.map((item, index) => {
                  const IconComponent = item.icon;
                  if (item.authRequired && !user) return null;
                  
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className={`relative flex flex-col items-center p-3 rounded-lg text-white hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg ${item.color}`}
                      >
                        {item.urgent && (
                          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full animate-pulse">
                            LIVE
                          </div>
                        )}
                        <IconComponent className="h-6 w-6 mb-1" />
                        <span className="text-xs font-medium text-center">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Support & Settings */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {supportItems.map((item, index) => {
                  const IconComponent = item.icon;
                  if (item.authRequired && !user) return null;
                  
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (quickAccessItems.length + index) * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex flex-col items-center p-3 rounded-lg text-white hover:scale-105 transform transition-all duration-200 shadow-md hover:shadow-lg ${item.color}`}
                      >
                        <IconComponent className="h-5 w-5 mb-1" />
                        <span className="text-xs font-medium text-center">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-900 p-4 rounded-full shadow-lg">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
            Election Commission Portal
          </h1>
          <p className="text-xl md:text-2xl text-blue-800 mb-2">
            Government of India
          </p>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto mb-8">
            A vibrant community where you can connect with others like family while participating 
            in the democratic process. Your voice matters, your vote counts.
          </p>
          
          {!user && (
            <Link
              to="/register"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Users className="h-6 w-6" />
              <span>Join Now</span>
            </Link>
          )}
        </motion.div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <IconComponent className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* New Features Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Enhanced Features & Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our latest tools and services designed to make your electoral experience seamless and informed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`${feature.color} p-4`}>
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-8 w-8 text-white" />
                      <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full">
                        {feature.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <Link
                      to={feature.path}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Explore Feature
                      <Target className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Core Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <Vote className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Secure Voting</h3>
            <p className="text-blue-700">
              Cast your vote securely with our advanced verification system and real-time confirmation
            </p>
          </div>
          
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Real-Time Results</h3>
            <p className="text-blue-700">
              Track election results and trends as they happen with live updates and analytics
            </p>
          </div>
          
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Transparency</h3>
            <p className="text-blue-700">
              Full transparency in the electoral process with detailed analytics and public reporting
            </p>
          </div>
        </motion.div>

        {/* Community Guidelines */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white mb-12">
          <div className="text-center mb-6">
            <Award className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Community Guidelines</h2>
            <p className="text-blue-100">
              Building a respectful and inclusive democratic community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Core Values</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>No fight in matters of religion</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>If you give respect, you will get respect</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Promote peaceful democratic participation</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h3 className="font-semibold mb-3">Platform Rules</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Maintain electoral integrity</span>
                </li>
                <li className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Report suspicious activities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Support transparency and fairness</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions for Logged-in Users */}
        {user && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome back, {user.name}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/voting"
                className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Vote className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-medium text-gray-900">Cast Your Vote</p>
                  <p className="text-sm text-gray-600">Participate in active elections</p>
                </div>
              </Link>
              
              <Link
                to="/notes"
                className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <StickyNote className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">My Notes</p>
                  <p className="text-sm text-gray-600">Manage your election notes</p>
                </div>
              </Link>
              
              <Link
                to="/settings"
                className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Settings className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Account Settings</p>
                  <p className="text-sm text-gray-600">Manage your preferences</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;