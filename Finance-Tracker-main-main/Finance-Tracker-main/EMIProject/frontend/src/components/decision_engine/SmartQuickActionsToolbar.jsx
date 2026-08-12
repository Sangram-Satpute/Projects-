import React from 'react';
import { Brain, Target, TrendingUp, FileText, Sparkles } from 'lucide-react';

export const SmartQuickActionsToolbar = ({ onOpenAfford, onOpenGoal, onOpenForecast, onExportReport }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
          <Brain className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">FinShield Prime Decision Engine</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Automated purchase evaluation, cashflow forecasting & goal simulation</p>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <button
          onClick={onOpenAfford}
          className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Can I Afford This?</span>
        </button>

        <button
          onClick={onOpenGoal}
          className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <Target className="w-3.5 h-3.5 text-blue-500" />
          <span>Simulate Goal</span>
        </button>

        <button
          onClick={onOpenForecast}
          className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          <span>Predict Cash Flow</span>
        </button>

        <button
          onClick={onExportReport}
          className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-amber-500" />
          <span>AI Report</span>
        </button>
      </div>
    </div>
  );
};
