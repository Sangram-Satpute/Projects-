import React, { useState } from 'react';
import { Calendar, Download, RefreshCw, Maximize2, Filter, Sparkles } from 'lucide-react';

export const AnalyticsToolbar = ({ onRefresh, onExport, timeRange, setTimeRange }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">Phase 4 – Analytics Dashboard</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Enterprise visual intelligence & cashflow analytics</p>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        {/* Time Range Filter */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold">
          {['daily', 'weekly', 'monthly', 'yearly'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <button
          onClick={onRefresh}
          className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xs font-bold flex items-center gap-1.5"
          title="Refresh Data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Refresh</span>
        </button>

        <button
          onClick={onExport}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
};
