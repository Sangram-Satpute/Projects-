import React from 'react';
import { Target, TrendingUp, Calendar } from 'lucide-react';

const GOALS = [
  { name: 'Royal Enfield Bike', saved: 65000, target: 150000, pct: 43.3, date: 'Jun 2027', category: 'Vehicle' },
  { name: 'MacBook Pro M3', saved: 90000, target: 180000, pct: 50.0, date: 'Dec 2026', category: 'Electronics' },
  { name: 'Europe Vacation', saved: 40000, target: 200000, pct: 20.0, date: 'Aug 2027', category: 'Travel' },
];

export const SavingsGoalsWidget = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-500" /> Savings Goals & Timeline Projections
        </h3>
        <a href="/savings/" className="text-xs text-blue-500 font-bold hover:underline">Manage Goals</a>
      </div>

      <div className="space-y-4">
        {GOALS.map((g, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-gray-900 dark:text-white">{g.name}</span>
              <span className="text-gray-400">₹{g.saved.toLocaleString()} / ₹{g.target.toLocaleString()}</span>
            </div>

            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${g.pct}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-[11px] text-gray-400">
              <span className="text-purple-500 font-bold">{g.pct}% Saved</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Target: {g.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
