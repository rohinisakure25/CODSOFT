import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search: searchTerm, location });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Job title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;