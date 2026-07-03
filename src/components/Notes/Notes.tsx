import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Note } from '../../types';
import { Plus, Search, Filter, Edit3, Trash2, Star, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../Common/BackButton';

const Notes: React.FC = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'general' as Note['category'],
    isImportant: false
  });

  useEffect(() => {
    // Load mock notes
    const mockNotes: Note[] = [
      {
        id: '1',
        title: 'Election Day Reminder',
        content: 'Remember to vote on April 19th, 2024. Polling station: Community Center, Booth #15',
        category: 'election',
        createdAt: '2024-04-10T10:00:00Z',
        updatedAt: '2024-04-10T10:00:00Z',
        isImportant: true
      },
      {
        id: '2',
        title: 'Candidate Research',
        content: 'Research candidates:\n- Rajesh Kumar (Congress) - Focus on education\n- Priya Sharma (BJP) - Infrastructure development\n- Arjun Singh (AAP) - Anti-corruption',
        category: 'candidate',
        createdAt: '2024-04-08T14:30:00Z',
        updatedAt: '2024-04-09T16:45:00Z',
        isImportant: false
      },
      {
        id: '3',
        title: 'Voting Process',
        content: 'Steps for voting:\n1. Verify identity at registration desk\n2. Get ballot paper\n3. Mark choice clearly\n4. Submit ballot\n5. Get ink mark on finger',
        category: 'general',
        createdAt: '2024-04-05T09:15:00Z',
        updatedAt: '2024-04-05T09:15:00Z',
        isImportant: false
      }
    ];
    setNotes(mockNotes);
  }, []);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        ...newNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', category: 'general', isImportant: false });
      setShowAddNote(false);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
      category: note.category,
      isImportant: note.isImportant
    });
    setShowAddNote(true);
  };

  const handleUpdateNote = () => {
    if (editingNote && newNote.title.trim() && newNote.content.trim()) {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, ...newNote, updatedAt: new Date().toISOString() }
          : note
      ));
      setEditingNote(null);
      setNewNote({ title: '', content: '', category: 'general', isImportant: false });
      setShowAddNote(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const toggleImportant = (noteId: string) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, isImportant: !note.isImportant, updatedAt: new Date().toISOString() }
        : note
    ));
  };

  const getCategoryColor = (category: Note['category']) => {
    switch (category) {
      case 'election': return 'bg-blue-100 text-blue-800';
      case 'candidate': return 'bg-green-100 text-green-800';
      case 'reminder': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please login to access your notes.</p>
          <a href="/login" className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition-colors">
            Login Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton to="/" className="mb-4" />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">My Notes</h1>
              <p className="text-gray-600 mt-2">Keep track of important election information</p>
            </div>
            <button
              onClick={() => setShowAddNote(true)}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Note</span>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="election">Election</option>
                  <option value="candidate">Candidate</option>
                  <option value="general">General</option>
                  <option value="reminder">Reminder</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {filteredNotes.length} of {notes.length} notes
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(note.category)}`}>
                    {note.category}
                  </span>
                  {note.isImportant && (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => toggleImportant(note.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Star className={`h-4 w-4 ${note.isImportant ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => handleEditNote(note)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Edit3 className="h-4 w-4 text-gray-400 hover:text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-4 whitespace-pre-wrap">{note.content}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
                {note.updatedAt !== note.createdAt && (
                  <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first note to get started'
              }
            </p>
            <button
              onClick={() => setShowAddNote(true)}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              Add Your First Note
            </button>
          </div>
        )}

        {/* Add/Edit Note Modal */}
        {showAddNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {editingNote ? 'Edit Note' : 'Add New Note'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newNote.category}
                    onChange={(e) => setNewNote({ ...newNote, category: e.target.value as Note['category'] })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">General</option>
                    <option value="election">Election</option>
                    <option value="candidate">Candidate</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows={6}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter note content"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="important"
                    checked={newNote.isImportant}
                    onChange={(e) => setNewNote({ ...newNote, isImportant: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="important" className="ml-2 text-sm text-gray-700">
                    Mark as important
                  </label>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowAddNote(false);
                    setEditingNote(null);
                    setNewNote({ title: '', content: '', category: 'general', isImportant: false });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingNote ? handleUpdateNote : handleAddNote}
                  className="flex-1 bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
                >
                  {editingNote ? 'Update Note' : 'Add Note'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;