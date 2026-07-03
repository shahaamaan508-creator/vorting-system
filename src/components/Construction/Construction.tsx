import React, { useState } from 'react';
import { ConstructionUpdate } from '../../types';
import { Construction as ConstructionIcon, Calendar, MapPin, DollarSign, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../Common/BackButton';

const Construction: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const constructionUpdates: ConstructionUpdate[] = [
    {
      id: '1',
      title: 'New Polling Station - Community Center',
      description: 'Construction of a modern polling facility with accessibility features and digital infrastructure.',
      progress: 85,
      status: 'in-progress',
      startDate: '2024-01-15',
      expectedEndDate: '2024-04-30',
      location: 'Sector 15, New Delhi',
      contractor: 'Delhi Infrastructure Ltd.',
      budget: 2500000,
      images: [
        'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '2',
      title: 'Election Commission Regional Office',
      description: 'Renovation and expansion of the regional election commission office with modern facilities.',
      progress: 60,
      status: 'in-progress',
      startDate: '2024-02-01',
      expectedEndDate: '2024-06-15',
      location: 'Central Delhi',
      contractor: 'Modern Builders Pvt. Ltd.',
      budget: 5000000,
      images: [
        'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '3',
      title: 'Digital Voting Infrastructure',
      description: 'Installation of high-speed internet and digital infrastructure for electronic voting systems.',
      progress: 100,
      status: 'completed',
      startDate: '2023-11-01',
      expectedEndDate: '2024-03-31',
      location: 'Multiple Locations',
      contractor: 'TechInfra Solutions',
      budget: 8000000,
      images: [
        'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    },
    {
      id: '4',
      title: 'Accessibility Upgrades',
      description: 'Adding ramps, elevators, and accessibility features to existing polling stations.',
      progress: 30,
      status: 'delayed',
      startDate: '2024-03-01',
      expectedEndDate: '2024-07-30',
      location: 'Various Constituencies',
      contractor: 'Accessible Spaces Inc.',
      budget: 3200000,
      images: [
        'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    }
  ];

  const filteredProjects = constructionUpdates.filter(project => {
    const matchesProject = selectedProject === 'all' || project.id === selectedProject;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesProject && matchesStatus;
  });

  const getStatusColor = (status: ConstructionUpdate['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ConstructionUpdate['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4" />;
      case 'planning': return <Calendar className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalBudget = constructionUpdates.reduce((sum, project) => sum + project.budget, 0);
  const completedProjects = constructionUpdates.filter(p => p.status === 'completed').length;
  const inProgressProjects = constructionUpdates.filter(p => p.status === 'in-progress').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton to="/" className="mb-4" />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Construction Updates</h1>
              <p className="text-gray-600 mt-2">Track infrastructure development and improvements</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <ConstructionIcon className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{constructionUpdates.length}</p>
                <p className="text-xs text-blue-600">Active developments</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedProjects}</p>
                <p className="text-xs text-green-600">Projects finished</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressProjects}</p>
                <p className="text-xs text-orange-600">Active construction</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">₹{(totalBudget / 10000000).toFixed(1)}Cr</p>
                <p className="text-xs text-purple-600">Investment</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status.replace('-', ' ')}</span>
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-blue-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">₹{(project.budget / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(project.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{project.contractor}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Expected Completion</p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(project.expectedEndDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <ConstructionIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500">
              Try adjusting your filter criteria to see more projects.
            </p>
          </div>
        )}

        {/* Project Timeline */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline</h3>
          <div className="space-y-4">
            {constructionUpdates
              .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
              .map((project, index) => (
                <div key={project.id} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${
                    project.status === 'completed' ? 'bg-green-500' :
                    project.status === 'in-progress' ? 'bg-blue-500' :
                    project.status === 'delayed' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{project.title}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.expectedEndDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{project.location}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Construction Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <ul className="space-y-1">
              <li>• All construction follows accessibility standards</li>
              <li>• Environmental impact assessments completed</li>
              <li>• Regular safety inspections conducted</li>
            </ul>
            <ul className="space-y-1">
              <li>• Community feedback incorporated in designs</li>
              <li>• Sustainable materials and practices used</li>
              <li>• Progress updates published monthly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Construction;