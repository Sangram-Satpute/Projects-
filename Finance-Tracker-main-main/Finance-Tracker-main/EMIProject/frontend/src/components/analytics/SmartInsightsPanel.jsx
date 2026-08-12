import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SmartInsightsPanel = () => {
  const insights = [
    { title: 'Spending Increased 12%', desc: 'Food expenses are 18% above your 60-day average.', type: 'warning', icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { title: 'Savings Rate Improved +9%', desc: 'Your liquid buffer increased by ₹14,000 this cycle.', type: 'success', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Budget Utilization Healthy', desc: 'Net debt-to-income remains safely under 35%.', type: 'info', icon: ShieldCheck, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 mb-6 shadow-sm">
      <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-purple-500" /> Smart AI Insights Panel
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className={`p-4 rounded-2xl border ${item.color} flex items-start gap-3`}>
              <div className="p-2 rounded-xl bg-white/80 dark:bg-gray-900/80 shadow-xs shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-gray-900 dark:text-white">{item.title}</div>
                <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-1">{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
