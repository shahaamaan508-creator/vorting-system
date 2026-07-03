import React, { useState, useEffect } from 'react';
import { livePolls } from '../../data/mockData';
import { Poll } from '../../types';
import { BarChart3, Users, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../Common/BackButton';

const LivePolls: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>(livePolls);
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());

  const handleVote = (pollId: string, optionId: string) => {
    if (votedPolls.has(pollId)) return;

    setPolls(prevPolls =>
      prevPolls.map(poll => {
        if (poll.id === pollId) {
          return {
            ...poll,
            options: poll.options.map(option => ({
              ...option,
              votes: option.id === optionId ? option.votes + 1 : option.votes
            })),
            totalVotes: poll.totalVotes + 1
          };
        }
        return poll;
      })
    );

    setVotedPolls(prev => new Set([...prev, pollId]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton to="/" className="mb-6" />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Live Polls</h1>
          <p className="text-gray-600">
            Participate in real-time polls and see what the community thinks
          </p>
        </div>

        <div className="space-y-8">
          {polls.map((poll, index) => (
            <motion.div
              key={poll.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      poll.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {poll.isActive ? 'Active' : 'Closed'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{poll.totalVotes.toLocaleString()} votes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Live</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {poll.question}
                </h3>

                <div className="space-y-4">
                  {poll.options.map((option) => {
                    const percentage = poll.totalVotes > 0 
                      ? (option.votes / poll.totalVotes) * 100 
                      : 0;
                    const hasVoted = votedPolls.has(poll.id);

                    return (
                      <div
                        key={option.id}
                        className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                          hasVoted
                            ? 'border-gray-200 cursor-default'
                            : 'border-gray-200 hover:border-blue-300 cursor-pointer'
                        }`}
                        onClick={() => !hasVoted && handleVote(poll.id, option.id)}
                      >
                        <div className="p-4 relative z-10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {hasVoted && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                              <span className="font-medium text-gray-900">
                                {option.text}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">
                                {option.votes.toLocaleString()} votes
                              </span>
                              <span className="text-sm font-medium text-blue-600">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        {hasVoted && (
                          <div
                            className="absolute inset-0 bg-blue-100 opacity-30"
                            style={{ width: `${percentage}%` }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {votedPolls.has(poll.id) && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-green-800 font-medium">
                        Thank you for voting! Results are updated in real-time.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Poll Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800">Community Rules:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• No fight in matters of religion</li>
                <li>• If you give respect, you will get respect</li>
                <li>• Maintain civil discourse in all interactions</li>
                <li>• Vote based on your genuine opinions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800">How it Works:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Select your preferred option to vote</li>
                <li>• Results update in real-time</li>
                <li>• One vote per poll per user</li>
                <li>• Polls remain active until closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePolls;