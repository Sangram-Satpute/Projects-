import React from 'react';
import { Target, Search, Filter, Plus, Download, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const GoalsToolbar = ({ onAddGoal, searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, statusFilter, setStatusFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">Smart Savings Goals & Target Planner</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">AI-assisted target tracking, scenario simulation & milestone milestone tracking</p>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
        {/* Search */}
        <div className="relative flex-1 sm:w-44">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search goal name..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none"
        >
          <option value="ALL">All Categories</option>
          <option value="LAPTOP">Laptop / Tech</option>
          <option value="BIKE">Bike / Vehicle</option>
          <option value="VACATION">Vacation / Travel</option>
          <option value="EMERGENCY">Emergency Fund</option>
          <option value="HOME">Home / Property</option>
          <option value="EDUCATION">Education</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none"
        >
          <option value="ALL">All Statuses</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>

        <button
          onClick={onAddGoal}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Create Goal</span>
        </button>
      </div>
    </div>
  );
};
