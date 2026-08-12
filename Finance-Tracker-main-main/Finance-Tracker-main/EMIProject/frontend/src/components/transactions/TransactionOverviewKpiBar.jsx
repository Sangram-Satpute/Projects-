import React from 'react';
import { Receipt, ArrowDownLeft, ArrowUpRight, CheckCircle2, Clock, XCircle, TrendingDown, DollarSign } from 'lucide-react';

export const TransactionOverviewKpiBar = () => {
  const kpis = [
    { label: 'Total Transactions', value: '148 Total', sub: '145 Done • 2 Pending', icon: Receipt, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Total Income', value: '₹80,000', sub: 'Verified Credit', icon: ArrowDownLeft, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Total Expenses', value: '₹25,400', sub: '31.7% of Income', icon: ArrowUpRight, color: 'text-rose-500 bg-rose-500/10' },
    { label: 'Successful Txns', value: '145 Cleared', sub: '100% Settled', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Pending Txns', value: '2 Processing', sub: 'Bank Clearance', icon: Clock, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Avg Daily Outflow', value: '₹846 / day', sub: 'Budget Compliant', icon: TrendingDown, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Largest Outflow', value: '₹1,40,000', sub: 'iPhone 16 Pro', icon: DollarSign, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'Risk Score Avg', value: '4 / 100', sub: 'Low Risk Profile', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 shadow-sm hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider truncate">{kpi.label}</span>
              <div className={`p-1.5 rounded-lg ${kpi.color}`}>
                <Icon className="w-3 h-3" />
              </div>
            </div>
            <div className="text-sm font-extrabold text-gray-900 dark:text-white truncate">{kpi.value}</div>
            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mt-0.5 truncate">{kpi.sub}</div>
          </div>
        );
      })}
    </div>
  );
};
