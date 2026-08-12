import React from 'react';
import { Award, TrendingUp, ShieldCheck } from 'lucide-react';

export const FinancialSummaryCard = () => {
  return (
    <div className="bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-transparent border border-purple-500/20 rounded-3xl p-6 mb-6 backdrop-blur-md shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Grade A+ • EXCELLENT
            </span>
            <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> +4.2% score growth
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Financial Health Score: <span className="text-purple-600 dark:text-purple-400">82 / 100</span>
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium max-w-xl">
            Your monthly net liquid surplus of ₹55,000 provides a 4.2-month emergency cushion with optimal debt-to-income ratio (16%).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase font-extrabold text-gray-400">Verified Cashflow</div>
            <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">+₹80,000 / mo</div>
          </div>
          <div className="p-3 rounded-2xl bg-purple-500 text-white shadow-md">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
