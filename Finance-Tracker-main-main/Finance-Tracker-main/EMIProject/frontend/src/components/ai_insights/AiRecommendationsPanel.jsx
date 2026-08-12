import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

export const AiRecommendationsPanel = () => {
  const [expandedId, setExpandedId] = useState(null);

  const recommendations = [
    {
      id: 1,
      title: 'Reduce Food & Dining Outflow',
      priority: 'HIGH',
      priorityColor: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
      savings: '₹3,500 / mo',
      summary: 'Dining expenses exceed 60-day average by 18%. Setting a ₹10,000 cap will boost savings by +4.3%.',
      details: 'Based on last month’s transaction analysis across Swiggy and Zomato, dining out represents 34% of your total discretionary expenses. Cap dining orders to 2 times per week to achieve target savings.'
    },
    {
      id: 2,
      title: 'Increase SIP Contribution in Index Mutual Funds',
      priority: 'MEDIUM',
      priorityColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      savings: '+₹5,000 / mo',
      summary: 'Your liquid bank balance is ₹2,45,000. Reallocating ₹5,000 extra per month into Equity Index funds increases long-term ROI.',
      details: 'With an emergency fund exceeding 4 months of expenses, keeping idle cash in standard savings yields only 3.5% p.a. Shifting to an automated monthly SIP boosts projected 5-year CAGR to 12.4%.'
    },
    {
      id: 3,
      title: 'Optimize Recurring Subscriptions',
      priority: 'LOW',
      priorityColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      savings: '₹850 / mo',
      summary: 'Two overlapping streaming services detected (Netflix & Amazon Prime). Pause underutilized subscriptions.',
      details: 'AI transaction monitoring identified non-daily usage of secondary streaming subscriptions. Consolidating into an annual plan or pausing alternate months saves up to ₹10,200 annually.'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" /> AI Actionable Recommendations
        </h3>
        <span className="text-xs font-bold text-gray-400">3 Priority Tasks</span>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const isExpanded = expandedId === rec.id;
          return (
            <div key={rec.id} className="border border-gray-200 dark:border-gray-800 rounded-2xl p-4 transition-all hover:border-purple-500/30">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : rec.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase border ${rec.priorityColor}`}>
                    {rec.priority}
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">{rec.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{rec.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{rec.savings}</span>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  <strong className="text-gray-900 dark:text-white">AI Deep Dive: </strong>
                  {rec.details}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
