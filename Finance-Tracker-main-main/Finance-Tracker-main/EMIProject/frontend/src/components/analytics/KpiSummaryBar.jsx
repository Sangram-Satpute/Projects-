import React from 'react';
import { Tag, TrendingUp, DollarSign, Percent, ShieldCheck, Award } from 'lucide-react';

export const KpiSummaryBar = () => {
  const kpis = [
    { label: 'Highest Expense Category', value: 'Food & Dining', sub: '₹12,400 (34%)', icon: Tag, color: 'text-rose-500 bg-rose-500/10' },
    { label: 'Highest Income Source', value: 'Salary (Tech Corp)', sub: '₹80,000 / mo', icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Avg Monthly Spending', value: '₹28,500', sub: 'Stable 6-mo avg', icon: TrendingUp, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Savings Rate', value: '64.3%', sub: '+4.2% MoM growth', icon: Percent, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'Investment Growth', value: '+14.8%', sub: '₹77,312 Portfolio', icon: Award, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Budget Efficiency', value: '92 / 100', sub: 'Optimal DTI & Cushion', icon: ShieldCheck, color: 'text-amber-500 bg-amber-500/10' },
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
