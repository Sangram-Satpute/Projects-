import React from 'react';
import { FolderClosed, ShieldHeart, Search, Filter, Upload, FileText, Lock } from 'lucide-react';

export const VaultToolbar = ({ activeTab, setActiveTab, searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, onUpload }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          {activeTab === 'DOCUMENTS' ? <FolderClosed className="w-5 h-5" /> : <ShieldHeart className="w-5 h-5" />}
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">
            {activeTab === 'DOCUMENTS' ? 'Encrypted Document Vault' : 'Insurance Policy & Coverage Hub'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {activeTab === 'DOCUMENTS' ? 'PIN-secured document storage, OCR extraction & verification' : 'Coverage tracking, premium due reminders & policy renewal insights'}
          </p>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
        {/* Tab Switcher */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('DOCUMENTS')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
              activeTab === 'DOCUMENTS' ? 'bg-white dark:bg-gray-900 text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Documents
          </button>
          <button
            onClick={() => setActiveTab('POLICIES')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
              activeTab === 'POLICIES' ? 'bg-white dark:bg-gray-900 text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Policies
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 sm:w-40">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <button
          onClick={onUpload}
          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{activeTab === 'DOCUMENTS' ? '+ Upload Document' : '+ Add Policy'}</span>
        </button>
      </div>
    </div>
  );
};
