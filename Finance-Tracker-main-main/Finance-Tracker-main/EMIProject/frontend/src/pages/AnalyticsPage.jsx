import React, { useState } from 'react';
import { AnalyticsToolbar } from '../components/analytics/AnalyticsToolbar';
import { KpiSummaryBar } from '../components/analytics/KpiSummaryBar';
import { SmartInsightsPanel } from '../components/analytics/SmartInsightsPanel';
import { SpendingHeatmap } from '../components/analytics/SpendingHeatmap';

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  const handleExport = () => {
    alert('Exporting Phase 4 Analytics PDF/PNG Report...');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <AnalyticsToolbar
        onRefresh={handleRefresh}
        onExport={handleExport}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />

      <KpiSummaryBar />

      <SmartInsightsPanel />

      <SpendingHeatmap />

      {/* Grid of Visualization Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income vs Expense Widget */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Income vs Expense & Net Savings</h4>
            <span className="text-[10px] font-bold px-2 py-1 bg-blue-500/10 text-blue-500 rounded-md">Filter: {timeRange}</span>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800/40 rounded-2xl text-xs text-gray-400 font-bold border border-gray-100 dark:border-gray-800">
            [Recharts Area + Line Chart: Income ₹80,000 | Outflow ₹25,000 | Net Savings ₹55,000]
          </div>
        </div>

        {/* Expense Category Donut */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Expense Category Breakdown</h4>
            <span className="text-[10px] font-bold px-2 py-1 bg-purple-500/10 text-purple-500 rounded-md">Top: Food (34%)</span>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800/40 rounded-2xl text-xs text-gray-400 font-bold border border-gray-100 dark:border-gray-800">
            [Recharts Donut Chart: Food 34%, Transport 15%, Bills 25%, EMI 16%, Other 10%]
          </div>
        </div>

        {/* Investment Growth */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Investment Portfolio Growth</h4>
            <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md">ROI +14.8%</span>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800/40 rounded-2xl text-xs text-gray-400 font-bold border border-gray-100 dark:border-gray-800">
            [Recharts Multi-Line: Stocks ₹42,000 | Mutual Funds ₹35,312 | Total ₹77,312]
          </div>
        </div>

        {/* Budget Utilization Circular Progress */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Budget Utilization & Warning Alerts</h4>
            <span className="text-[10px] font-bold px-2 py-1 bg-rose-500/10 text-rose-500 rounded-md">Food &gt;80% Warning</span>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800/40 rounded-2xl text-xs text-gray-400 font-bold border border-gray-100 dark:border-gray-800">
            [Circular Progress Meters: Food 88% ⚠️ | Transport 40% | Bills 65%]
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
