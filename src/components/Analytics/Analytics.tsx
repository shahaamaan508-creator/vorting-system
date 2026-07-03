import React, { useState } from 'react';
import { currentElection, historicalElections } from '../../data/mockData';
import { TrendingUp, Users, BarChart3, PieChart, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import BackButton from '../Common/BackButton';

const Analytics: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('2024');
  const [selectedMetric, setSelectedMetric] = useState('votes');

  // Mock trend data
  const trendData = [
    { time: '09:00', votes: 1200, turnout: 5.2 },
    { time: '10:00', votes: 3200, turnout: 8.7 },
    { time: '11:00', votes: 5800, turnout: 12.4 },
    { time: '12:00', votes: 8900, turnout: 18.1 },
    { time: '13:00', votes: 12400, turnout: 25.3 },
    { time: '14:00', votes: 16200, turnout: 32.8 },
    { time: '15:00', votes: 19800, turnout: 39.2 },
    { time: '16:00', votes: 23100, turnout: 45.6 },
    { time: '17:00', votes: 26800, turnout: 52.1 }
  ];

  const demographicData = [
    { age: '18-25', votes: 28500, percentage: 19.1 },
    { age: '26-35', votes: 42300, percentage: 28.4 },
    { age: '36-45', votes: 38700, percentage: 26.0 },
    { age: '46-55', votes: 25200, percentage: 16.9 },
    { age: '55+', votes: 14300, percentage: 9.6 }
  ];

  const historicalTurnout = historicalElections.map(election => ({
    year: election.year,
    turnout: election.turnout,
    totalVotes: election.totalVotes / 1000000 // Convert to millions
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton to="/" className="mb-4" />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Analytics & Trends</h1>
              <p className="text-gray-600 mt-2">Comprehensive voting pattern analysis</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2024">2024 Election</option>
                <option value="2019">2019 Election</option>
                <option value="2014">2014 Election</option>
              </select>
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-md border border-gray-300">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Live Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Voters</p>
                <p className="text-2xl font-bold text-gray-900">2.1M</p>
                <p className="text-xs text-green-600">+5.2% from 2019</p>
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
                <p className="text-sm text-gray-600">Turnout Rate</p>
                <p className="text-2xl font-bold text-gray-900">72.5%</p>
                <p className="text-xs text-green-600">+3.1% vs average</p>
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
              <BarChart3 className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Peak Hour</p>
                <p className="text-2xl font-bold text-gray-900">2-3 PM</p>
                <p className="text-xs text-purple-600">26.8K votes/hour</p>
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
              <PieChart className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Margin</p>
                <p className="text-2xl font-bold text-gray-900">6.8%</p>
                <p className="text-xs text-orange-600">Leading candidate</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Real-time Voting Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Voting Trends (Today)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="votes" stackId="1" stroke="#1e40af" fill="#3b82f6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Turnout by Age Group</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demographicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votes" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historical Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Turnout Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalTurnout}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="totalVotes" fill="#f97316" name="Total Votes (Millions)" />
              <Line yAxisId="right" type="monotone" dataKey="turnout" stroke="#dc2626" strokeWidth={3} name="Turnout %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Analytics Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-blue-900 text-white">
            <h3 className="text-lg font-semibold">Constituency-wise Analysis</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Constituency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Voters
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Votes Cast
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turnout %
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leading Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Margin
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: 'Central Delhi', totalVoters: 145280, votesCast: 108450, turnout: 74.6, leadingParty: 'BJP', margin: 8.2 },
                  { name: 'South Delhi', totalVoters: 167340, votesCast: 119680, turnout: 71.5, leadingParty: 'AAP', margin: 5.7 },
                  { name: 'North Delhi', totalVoters: 134590, votesCast: 98230, turnout: 73.0, leadingParty: 'Congress', margin: 12.3 },
                  { name: 'East Delhi', totalVoters: 156780, votesCast: 115640, turnout: 73.8, leadingParty: 'BJP', margin: 6.1 },
                  { name: 'West Delhi', totalVoters: 142350, votesCast: 103290, turnout: 72.6, leadingParty: 'AAP', margin: 9.4 }
                ].map((constituency, index) => (
                  <motion.tr
                    key={constituency.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {constituency.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {constituency.totalVoters.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {constituency.votesCast.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        constituency.turnout >= 75 ? 'bg-green-100 text-green-800' :
                        constituency.turnout >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {constituency.turnout}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        constituency.leadingParty === 'BJP' ? 'bg-orange-100 text-orange-800' :
                        constituency.leadingParty === 'Congress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {constituency.leadingParty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {constituency.margin}%
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;