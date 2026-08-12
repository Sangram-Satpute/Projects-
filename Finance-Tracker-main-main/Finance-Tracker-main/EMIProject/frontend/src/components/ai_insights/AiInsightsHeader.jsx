import React from 'react';
import { Sparkles, RefreshCw, Filter } from 'lucide-react';

export const AiInsightsHeader = ({ filter, setFilter, onRefresh }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">FinShield AI Insights Engine</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Real-time financial recommendations, predictive analytics & anomaly detection</p>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold">
          {['today', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setFilter(range)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                filter === range
                  ? 'bg-purple-600 text-white shadow-sm font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <button
          onClick={onRefresh}
          className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xs font-bold flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Refresh AI</span>
        </button>
      </div>
    </div>
  );
};
