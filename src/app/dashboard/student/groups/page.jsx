'use client'

import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const StudyGroups = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('my-groups');
  
  const groups = [
    {
      id: 1,
      name: 'Data Structures and Algorithms',
      description: 'No description'
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-4">Study Groups</h1>
        
        {/* Search and Create Group Bar */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 text-gray-200 rounded-lg pl-4 pr-12 py-2 border border-gray-700 focus:outline-none focus:border-gray-600"
            />
            <button className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-300">
              <Search size={20} />
            </button>
          </div>
          
          <button className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Plus size={20} />
            <span className="font-medium">Create New Group</span>
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-900 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('my-groups')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'my-groups'
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          My Groups
        </button>
        <button
          onClick={() => setActiveTab('discover')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'discover'
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Discover
        </button>
      </div>
      
      {/* Groups List */}
      <div className="space-y-4">
        {groups.map(group => (
          <div
            key={group.id}
            className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <h3 className="text-white font-medium mb-1">{group.name}</h3>
            <p className="text-gray-400 text-sm">{group.description}</p>
            <div className="flex justify-between items-center mt-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                View Group
              </button>
              <span className="text-gray-600">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyGroups;