import React, { useState } from 'react';
import { Rocket, CheckCircle, Users, Vote, BookOpen, Heart, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../Common/BackButton';

const GetStarted: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    interests: [],
    experience: '',
    availability: ''
  });
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const paths = [
    {
      id: 'voter',
      title: 'Become an Active Voter',
      description: 'Learn about voting, register, and participate in elections',
      icon: Vote,
      color: 'bg-blue-500',
      features: ['Voter registration assistance', 'Election notifications', 'Candidate information', 'Voting guides']
    },
    {
      id: 'volunteer',
      title: 'Join as Volunteer',
      description: 'Help strengthen democracy through various volunteer programs',
      icon: Heart,
      color: 'bg-red-500',
      features: ['Election observer', 'Digital ambassador', 'Community educator', 'Event support']
    },
    {
      id: 'educator',
      title: 'Become an Educator',
      description: 'Educate communities about democratic processes and voting rights',
      icon: BookOpen,
      color: 'bg-green-500',
      features: ['Training materials', 'Workshop planning', 'Community outreach', 'Certification program']
    },
    {
      id: 'advocate',
      title: 'Democracy Advocate',
      description: 'Promote democratic values and electoral integrity in your community',
      icon: Users,
      color: 'bg-purple-500',
      features: ['Advocacy training', 'Campaign support', 'Policy discussions', 'Community leadership']
    }
  ];

  const interests = [
    'Voter Education',
    'Election Monitoring',
    'Digital Literacy',
    'Community Outreach',
    'Policy Advocacy',
    'Youth Engagement',
    'Senior Citizen Support',
    'Accessibility Services'
  ];

  const handleInterestChange = (interest: string) => {
    const updatedInterests = userInfo.interests.includes(interest)
      ? userInfo.interests.filter(i => i !== interest)
      : [...userInfo.interests, interest];
    
    setUserInfo({ ...userInfo, interests: updatedInterests });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto"
        >
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Democracy!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for joining our mission to strengthen democracy. We'll send you personalized recommendations and next steps based on your interests.
          </p>
          <div className="bg-green-50 p-4 rounded-md mb-6">
            <p className="text-sm text-green-800">
              <strong>Your Path:</strong> {paths.find(p => p.id === selectedPath)?.title}<br />
              <strong>Next Steps:</strong> Check your email for detailed guidance<br />
              <strong>Welcome Kit:</strong> Will arrive within 3-5 days
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors"
          >
            Explore Portal
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton to="/" className="mb-6" />
        
        <div className="text-center mb-8">
          <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Rocket className="h-10 w-10 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Get Started Today</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of citizens making a difference in democracy. Choose your path and start your journey.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepNum ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 ${
                    step > stepNum ? 'bg-blue-900' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Choose Your Path</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paths.map((path) => {
                  const IconComponent = path.icon;
                  return (
                    <div
                      key={path.id}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                        selectedPath === path.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPath(path.id)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${path.color}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{path.title}</h3>
                          <p className="text-gray-600 mb-4">{path.description}</p>
                          <ul className="space-y-1">
                            {path.features.map((feature, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {selectedPath === path.id && (
                          <CheckCircle className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Tell Us About Yourself</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                    <select
                      name="availability"
                      value={userInfo.availability}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select availability</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="evenings">Evenings</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {interests.map((interest) => (
                      <label key={interest} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={userInfo.interests.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Previous Experience</label>
                  <textarea
                    name="experience"
                    value={userInfo.experience}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about any relevant experience in civic activities, volunteering, or community work..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Review & Confirm</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Selected Path</h3>
                  {paths.filter(p => p.id === selectedPath).map(path => {
                    const IconComponent = path.icon;
                    return (
                      <div key={path.id} className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${path.color}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{path.title}</h4>
                          <p className="text-gray-600">{path.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                    <p className="text-sm text-gray-600">Name: {userInfo.name}</p>
                    <p className="text-sm text-gray-600">Email: {userInfo.email}</p>
                    <p className="text-sm text-gray-600">Phone: {userInfo.phone}</p>
                    <p className="text-sm text-gray-600">Availability: {userInfo.availability}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-1">
                      {userInfo.interests.map((interest, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">What Happens Next?</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• You'll receive a welcome email with detailed next steps</li>
                    <li>• Our team will contact you within 48 hours</li>
                    <li>• You'll get access to training materials and resources</li>
                    <li>• Join our community of democracy champions</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Previous
              </button>
            )}
            <button
              onClick={step === 3 ? handleSubmit : handleNext}
              disabled={step === 1 && !selectedPath}
              className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-auto flex items-center space-x-2"
            >
              <span>{step === 3 ? 'Complete Registration' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;