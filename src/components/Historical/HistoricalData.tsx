import React, { useState } from 'react';
import { historicalElections } from '../../data/mockData';
import { Calendar, TrendingUp, Users, Award, Search, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import BackButton from '../Common/BackButton';

const HistoricalData: React.FC = () => {
  const [selectedElection, setSelectedElection] = useState(historicalElections[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('year');

  const filteredElections = historicalElections.filter(election =>
    election.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    election.winner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedElections = [...filteredElections].sort((a, b) => {
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'turnout') return b.turnout - a.turnout;
    if (sortBy === 'votes') return b.totalVotes - a.totalVotes;
    return 0;
  });

  const turnoutTrend = historicalElections.map(election => ({
    year: election.year,
    turnout: election.turnout,
    totalVotes: election.totalVotes / 1000000
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton to="/" className="mb-4" />
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Historical Election Data</h1>
          <p className="text-gray-600">
            Explore past election results, trends, and comparative analysis
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search elections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="year">Sort by Year</option>
                  <option value="turnout">Sort by Turnout</option>
                  <option value="votes">Sort by Total Votes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Elections Tracked</p>
                <p className="text-2xl font-bold text-gray-900">{historicalElections.length}</p>
                <p className="text-xs text-blue-600">Since 2014</p>
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
              <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Avg Turnout</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(historicalElections.reduce((sum, e) => sum + e.turnout, 0) / historicalElections.length).toFixed(1)}%
                </p>
                <p className="text-xs text-green-600">Increasing trend</p>
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
              <Users className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Votes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(historicalElections.reduce((sum, e) => sum + e.totalVotes, 0) / 1000000000).toFixed(1)}B
                </p>
                <p className="text-xs text-purple-600">All elections</p>
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
              <Award className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Highest Turnout</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...historicalElections.map(e => e.turnout))}%
                </p>
                <p className="text-xs text-orange-600">2019 Election</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Historical Trends Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Turnout Trends Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={turnoutTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="right" dataKey="totalVotes" fill="#f97316" name="Total Votes (Millions)" />
              <Line yAxisId="left" type="monotone" dataKey="turnout" stroke="#1e40af" strokeWidth={3} name="Turnout %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Elections List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Election Cards */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Elections Overview</h3>
            {sortedElections.map((election, index) => (
              <motion.div
                key={election.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all ${
                  selectedElection?.id === election.id ? 'ring-2 ring-blue-500' : 'hover:shadow-xl'
                }`}
                onClick={() => setSelectedElection(election)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{election.title}</h4>
                    <p className="text-gray-600">{election.year}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Turnout</p>
                    <p className="text-xl font-bold text-blue-600">{election.turnout}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Winner</p>
                    <p className="font-medium text-gray-900">{election.winner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Votes</p>
                    <p className="font-medium text-gray-900">
                      {(election.totalVotes / 1000000).toFixed(0)}M
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Vote Distribution</span>
                    <span>View Details →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Results */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedElection.title} - Detailed Results
            </h3>
            
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Winner</p>
                  <p className="text-lg font-bold text-blue-900">{selectedElection.winner}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600">Turnout</p>
                  <p className="text-lg font-bold text-green-900">{selectedElection.turnout}%</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Results Breakdown</h4>
              {selectedElection.results.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{result.candidate}</p>
                    <p className="text-sm text-gray-600">{result.votes.toLocaleString()} votes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{result.percentage}%</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${result.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Key Insights</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Highest turnout recorded in this constituency</li>
                <li>• Youth voter participation increased by 12%</li>
                <li>• Digital voting initiatives improved accessibility</li>
                <li>• Record number of NOTA votes recorded</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalData;