import React from 'react';
import { Award, TrendingUp, ShieldCheck } from 'lucide-react';

export const HealthScoreCard = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Column: Health Score Ring & Grade */}
        <div className="flex items-center gap-5">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100 dark:text-gray-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-purple-600 dark:text-purple-400"
                strokeDasharray="82, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">82</span>
              <span className="text-[9px] font-bold text-gray-400">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Grade A+ • EXCELLENT
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +4.2% MoM
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Financial Health Rating</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-md">
              High liquidity reserve, low debt-to-income ratio (16%), and consistent savings rate (64.3%).
            </p>
          </div>
        </div>

        {/* Right Column: Key Sub-Metrics */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-center min-w-[120px]">
            <div className="text-[10px] font-extrabold text-gray-400 uppercase">Emergency Cushion</div>
            <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">4.2 Months</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-center min-w-[120px]">
            <div className="text-[10px] font-extrabold text-gray-400 uppercase">Debt Ratio (DTI)</div>
            <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">16% (Safe)</div>
          </div>
        </div>

      </div>
    </div>
  );
};
