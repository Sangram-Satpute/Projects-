import React, { useState } from 'react';
import { AiInsightsHeader } from '../components/ai_insights/AiInsightsHeader';
import { FinancialSummaryCard } from '../components/ai_insights/FinancialSummaryCard';
import { AiRecommendationsPanel } from '../components/ai_insights/AiRecommendationsPanel';
import { AlertTriangle, ShieldCheck, TrendingUp, Calendar, Zap, CreditCard, Bell, Sparkles } from 'lucide-react';

export function AiInsightsPage() {
  const [filter, setFilter] = useState('month');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <AiInsightsHeader filter={filter} setFilter={setFilter} onRefresh={() => alert('Refreshing AI Insights...')} />

      {/* 1. Financial Summary */}
      <FinancialSummaryCard />

      {/* 2. AI Actionable Recommendations */}
      <AiRecommendationsPanel />

      {/* 3. Grid of 6 Specialized AI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Spending Insights */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> Spending Anomaly & Trends
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-500/10 text-rose-500 rounded-md">+12% Outflow</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Highest Category: </span> Food & Dining (₹12,400)
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Weekend Spike: </span> +42% weekend dining vs weekdays
            </div>
          </div>
        </div>

        {/* Card 2: Savings Insights */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> Savings & Milestone Progress
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-md">64.3% Rate</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Emergency Fund Goal: </span> 84% achieved (4.2 / 5 months)
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Est. Annual Savings: </span> ₹6,60,000 / year
            </div>
          </div>
        </div>

        {/* Card 3: Budget Utilization */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" /> Budget Utilization
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded-md">35% Used</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Over-budget Category: </span> Food & Dining (88% of limit)
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Remaining Budget: </span> ₹55,000 unallocated
            </div>
          </div>
        </div>

        {/* Card 4: Predictive Cashflow */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-500" /> Predictive Forecast (Next Month)
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-500/10 text-purple-500 rounded-md">Low Risk</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Expected Expenses: </span> ₹26,800 (-6% vs current)
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Predicted Surplus: </span> ₹53,200 net liquid balance
            </div>
          </div>
        </div>

        {/* Card 5: Smart Security & Alerts Feed */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" /> Smart Security & Due Alerts
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-md">2 Alerts</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-semibold">
              ⚠️ Home Loan EMI due in 4 days (₹15,000)
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 font-semibold">
              ℹ️ HDFC Term Health Insurance renewal due Aug 15
            </div>
          </div>
        </div>

        {/* Card 6: AI Insight Timeline & Financial Tips */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-500" /> AI Observation Timeline
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-md">Live</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Aug 03: </span> Liquid cash reserve reached ₹2,45,000 milestone.
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Tip of Day: </span> "Setting an automated 20% savings transfer before spending increases wealth by 2.4x."
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AiInsightsPage;
