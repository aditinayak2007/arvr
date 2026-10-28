import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchTerm, setSearchTerm, placeholder = "Search by brand (e.g. BMW), model, body type (SUV, Electric)..." }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <Search className="w-5 h-5 text-cyan-400" />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-slate-900/70 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 backdrop-blur-md transition-all shadow-inner"
      />

      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
          title="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
