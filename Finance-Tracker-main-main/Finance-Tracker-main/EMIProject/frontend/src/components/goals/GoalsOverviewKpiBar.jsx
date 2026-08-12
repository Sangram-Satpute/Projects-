import React from 'react';
import { Target, CheckCircle2, TrendingUp, DollarSign, Award, Clock } from 'lucide-react';

export const GoalsOverviewKpiBar = () => {
  const kpis = [
    { label: 'Total Goals', value: '6 Total', sub: '4 Active • 2 Done', icon: Target, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Total Target', value: '₹10,50,000', sub: 'Target Target Pool', icon: DollarSign, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Total Saved', value: '₹5,95,000', sub: 'Accumulated Savings', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Remaining Gap', value: '₹4,55,000', sub: '43.4% Remaining', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Overall Progress', value: '56.6%', sub: 'Target Velocity: High', icon: Award, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'Completed Goals', value: '2 Achieved', sub: '100% Milestone Done', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider truncate">{kpi.label}</span>
              <div className={`p-1.5 rounded-lg ${kpi.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-base font-extrabold text-gray-900 dark:text-white truncate">{kpi.value}</div>
            <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mt-0.5 truncate">{kpi.sub}</div>
          </div>
        );
      })}
    </div>
  );
};
