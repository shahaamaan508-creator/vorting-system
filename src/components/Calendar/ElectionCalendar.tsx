import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Bell, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../Common/BackButton';

const ElectionCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [filterType, setFilterType] = useState('all');

  const events = [
    {
      id: 1,
      title: 'General Election 2024 - Phase 1',
      date: '2024-04-19',
      time: '07:00 - 18:00',
      type: 'election',
      location: 'Multiple States',
      description: 'First phase of Lok Sabha elections covering 102 constituencies',
      status: 'upcoming',
      importance: 'high'
    },
    {
      id: 2,
      title: 'Voter Registration Deadline',
      date: '2024-03-15',
      time: '23:59',
      type: 'deadline',
      location: 'All States',
      description: 'Last date for new voter registration',
      status: 'completed',
      importance: 'critical'
    },
    {
      id: 3,
      title: 'Candidate Nomination Filing',
      date: '2024-03-25',
      time: '11:00 - 15:00',
      type: 'nomination',
      location: 'District Collector Offices',
      description: 'Candidates can file their nomination papers',
      status: 'completed',
      importance: 'high'
    },
    {
      id: 4,
      title: 'Election Commission Press Conference',
      date: '2024-04-10',
      time: '14:00',
      type: 'announcement',
      location: 'New Delhi',
      description: 'Important announcements regarding election procedures',
      status: 'completed',
      importance: 'medium'
    },
    {
      id: 5,
      title: 'General Election 2024 - Phase 2',
      date: '2024-04-26',
      time: '07:00 - 18:00',
      type: 'election',
      location: 'Multiple States',
      description: 'Second phase covering 89 constituencies',
      status: 'upcoming',
      importance: 'high'
    },
    {
      id: 6,
      title: 'Results Declaration',
      date: '2024-06-04',
      time: '08:00',
      type: 'results',
      location: 'Counting Centers',
      description: 'Official results announcement',
      status: 'upcoming',
      importance: 'critical'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'election': return 'bg-red-100 text-red-800 border-red-200';
      case 'deadline': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'nomination': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'announcement': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'results': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'critical': return '🔴';
      case 'high': return '🟡';
      case 'medium': return '🟢';
      default: return '⚪';
    }
  };

  const filteredEvents = events.filter(event => 
    filterType === 'all' || event.type === filterType
  );

  const upcomingEvents = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton to="/" className="mb-4" />
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Election Calendar</h1>
          <p className="text-gray-600">
            Stay updated with important election dates, deadlines, and events
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.filter(e => e.status === 'upcoming').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Critical Events</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.filter(e => e.importance === 'critical').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Locations</p>
                <p className="text-2xl font-bold text-gray-900">15+</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-blue-500 pl-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                        <p className="text-xs text-gray-600">{event.date}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                      <span className="text-lg">{getImportanceIcon(event.importance)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Events</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    filterType === 'all' ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
                  }`}
                >
                  All Events
                </button>
                <button
                  onClick={() => setFilterType('election')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    filterType === 'election' ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
                  }`}
                >
                  Elections
                </button>
                <button
                  onClick={() => setFilterType('deadline')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    filterType === 'deadline' ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
                  }`}
                >
                  Deadlines
                </button>
                <button
                  onClick={() => setFilterType('announcement')}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    filterType === 'announcement' ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
                  }`}
                >
                  Announcements
                </button>
              </div>
            </div>
          </div>

          {/* Main Calendar/List View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Election Events</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      viewMode === 'month' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      viewMode === 'list' ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              {viewMode === 'list' && (
                <div className="space-y-4">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg">{getImportanceIcon(event.importance)}</span>
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.type)}`}>
                              {event.type}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {viewMode === 'month' && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
                  <p className="text-gray-500">
                    Interactive calendar view coming soon. Use list view to see all events.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Important Notices */}
        <div className="mt-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Important Notices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Voter Registration</h4>
              <p className="text-sm text-red-100">
                Ensure your voter registration is up to date. Check your status and update information if needed.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Polling Station Information</h4>
              <p className="text-sm text-red-100">
                Verify your polling station location and timings before election day to avoid any confusion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionCalendar;