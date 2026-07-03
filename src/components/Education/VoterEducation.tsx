import React, { useState } from 'react';
import { BookOpen, Users, Vote, Shield, CheckCircle, Play, Download, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../Common/BackButton';

const VoterEducation: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('voting-process');
  const [searchTerm, setSearchTerm] = useState('');

  const educationTopics = [
    {
      id: 'voting-process',
      title: 'How to Vote',
      description: 'Step-by-step guide to the voting process',
      icon: Vote,
      color: 'bg-blue-500',
      content: {
        overview: 'Learn the complete voting process from registration to casting your ballot.',
        steps: [
          'Verify your voter registration status',
          'Find your polling station location',
          'Bring valid identification documents',
          'Follow the voting procedure at the booth',
          'Cast your vote securely and confidentially'
        ],
        tips: [
          'Arrive early to avoid long queues',
          'Carry your voter ID card',
          'Understand the ballot format beforehand',
          'Ask for help if needed from polling officials'
        ]
      }
    },
    {
      id: 'voter-rights',
      title: 'Voter Rights & Duties',
      description: 'Understanding your rights and responsibilities',
      icon: Shield,
      color: 'bg-green-500',
      content: {
        overview: 'Every citizen has fundamental rights and duties in the democratic process.',
        rights: [
          'Right to vote without coercion',
          'Right to secrecy of vote',
          'Right to accessibility assistance',
          'Right to file complaints about electoral malpractices',
          'Right to information about candidates'
        ],
        duties: [
          'Vote responsibly and make informed choices',
          'Respect the electoral process',
          'Report electoral malpractices',
          'Maintain peace during elections',
          'Encourage others to participate in democracy'
        ]
      }
    },
    {
      id: 'candidate-info',
      title: 'Candidate Information',
      description: 'How to research and evaluate candidates',
      icon: Users,
      color: 'bg-purple-500',
      content: {
        overview: 'Make informed decisions by researching candidate backgrounds and policies.',
        research: [
          'Review candidate affidavits and declarations',
          'Check criminal and financial backgrounds',
          'Understand party manifestos and policies',
          'Attend public meetings and debates',
          'Use official Election Commission resources'
        ],
        evaluation: [
          'Compare candidate qualifications',
          'Assess track record and experience',
          'Evaluate policy positions',
          'Consider local development priorities',
          'Check for any pending legal cases'
        ]
      }
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Complete Voting Process Guide',
      duration: '5:30',
      thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'A comprehensive guide to the voting process'
    },
    {
      id: 2,
      title: 'Understanding Your Voter Rights',
      duration: '3:45',
      thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Know your rights as a voter'
    },
    {
      id: 3,
      title: 'How to Research Candidates',
      duration: '4:20',
      thumbnail: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Tips for evaluating candidates effectively'
    }
  ];

  const resources = [
    {
      title: 'Voter Handbook 2024',
      type: 'PDF',
      size: '2.5 MB',
      description: 'Complete guide to voting procedures and rights'
    },
    {
      title: 'Candidate Evaluation Checklist',
      type: 'PDF',
      size: '1.2 MB',
      description: 'Systematic approach to candidate assessment'
    },
    {
      title: 'Electoral Laws Summary',
      type: 'PDF',
      size: '3.1 MB',
      description: 'Key electoral laws and regulations'
    }
  ];

  const selectedTopicData = educationTopics.find(topic => topic.id === selectedTopic);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton to="/" className="mb-4" />
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Voter Education Hub</h1>
          <p className="text-gray-600">
            Empower yourself with knowledge about the democratic process and your role as a citizen
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search education topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Topic Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Education Topics</h3>
              <div className="space-y-2">
                {educationTopics.map((topic) => {
                  const IconComponent = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedTopic === topic.id
                          ? 'bg-blue-100 text-blue-900'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className={`p-2 rounded-md ${topic.color}`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{topic.title}</p>
                        <p className="text-xs text-gray-500">{topic.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedTopicData && (
              <motion.div
                key={selectedTopic}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6 mb-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 rounded-lg ${selectedTopicData.color}`}>
                    <selectedTopicData.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTopicData.title}</h2>
                    <p className="text-gray-600">{selectedTopicData.content.overview}</p>
                  </div>
                </div>

                {selectedTopicData.content.steps && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Process</h3>
                    <div className="space-y-3">
                      {selectedTopicData.content.steps.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTopicData.content.rights && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Rights</h3>
                      <div className="space-y-2">
                        {selectedTopicData.content.rights.map((right, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                            <p className="text-gray-700 text-sm">{right}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Duties</h3>
                      <div className="space-y-2">
                        {selectedTopicData.content.duties.map((duty, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                            <p className="text-gray-700 text-sm">{duty}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTopicData.content.tips && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">Helpful Tips</h3>
                    <div className="space-y-2">
                      {selectedTopicData.content.tips.map((tip, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <p className="text-yellow-700 text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Educational Videos */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Educational Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{video.title}</h4>
                      <p className="text-gray-600 text-xs">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downloadable Resources */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Downloadable Resources</h3>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 p-2 rounded-md">
                        <Download className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{resource.title}</p>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{resource.type}</p>
                      <p className="text-xs text-gray-500">{resource.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterEducation;