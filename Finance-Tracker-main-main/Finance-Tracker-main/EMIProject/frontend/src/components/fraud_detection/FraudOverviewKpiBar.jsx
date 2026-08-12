import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, ShieldAlert, Award, TrendingDown } from 'lucide-react';

export const FraudOverviewKpiBar = () => {
  const kpis = [
    { label: 'Fraud Risk Score', value: '98 / 100', sub: 'Low Risk Rating', icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Suspicious Txns', value: '0 Flagged', sub: 'Last 30 Days', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Safe Transactions', value: '142 Verified', sub: '100% Clean', icon: Award, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'High-Risk Txns', value: '1 Review', sub: 'Location Anomaly', icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Detection Accuracy', value: '99.4%', sub: 'ML Model v3.2', icon: ShieldAlert, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Fraud Outflow Trend', value: '-18%', sub: 'Zero Loss Record', icon: TrendingDown, color: 'text-indigo-500 bg-indigo-500/10' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:border-emerald-500/40 transition-all">
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
