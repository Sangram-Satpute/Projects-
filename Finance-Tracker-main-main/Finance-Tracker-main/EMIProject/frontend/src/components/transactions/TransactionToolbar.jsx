import React from 'react';
import { Receipt, Search, Filter, Plus, Download, RefreshCw, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const TransactionToolbar = ({ searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, typeFilter, setTypeFilter, onAddExpense, onAddIncome, onExport }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <Receipt className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">Smart Transaction Center & Quick Actions Hub</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Live ledger stream, transaction risk scoring, multi-wallet tracking & instant quick actions</p>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
        {/* Search Input */}
        <div className="relative flex-1 sm:w-44">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search merchant or ID..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none"
        >
          <option value="ALL">All Types</option>
          <option value="EXPENSE">Expense Outflow</option>
          <option value="INCOME">Income Credit</option>
        </select>

        <button
          onClick={onAddExpense}
          className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Expense</span>
        </button>

        <button
          onClick={onExport}
          className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>
    </div>
  );
};
