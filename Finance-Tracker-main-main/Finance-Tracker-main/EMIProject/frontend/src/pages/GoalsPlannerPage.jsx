import React, { useState } from 'react';
import { GoalsToolbar } from '../components/goals/GoalsToolbar';
import { GoalsOverviewKpiBar } from '../components/goals/GoalsOverviewKpiBar';
import { Target, Laptop, Bike, Plane, ShieldCheck, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';

export function GoalsPlannerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const goals = [
    { id: 1, name: 'MacBook Pro M3 Max', category: 'Laptop / Tech', target: 180000, saved: 120000, monthly: 15000, completion: 'Nov 2026', percent: 66, icon: Laptop, badge: '94% Probability' },
    { id: 2, name: 'Royal Enfield Hunter 350', category: 'Bike / Vehicle', target: 220000, saved: 85000, monthly: 12000, completion: 'Mar 2027', percent: 38, icon: Bike, badge: '88% Probability' },
    { id: 3, name: 'Japan Autumn Tour', category: 'Vacation / Travel', target: 300000, saved: 150000, monthly: 25000, completion: 'Oct 2026', percent: 50, icon: Plane, badge: '91% Probability' },
    { id: 4, name: '6-Month Emergency Cushion', category: 'Emergency Fund', target: 350000, saved: 240000, monthly: 18000, completion: 'Sep 2026', percent: 68, icon: ShieldCheck, badge: '98% Probability' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <GoalsToolbar
        onAddGoal={() => alert('Opening Create Savings Goal Modal...')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <GoalsOverviewKpiBar />

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g) => {
          const Icon = g.icon;
          return (
            <div key={g.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:border-blue-500/40 transition-all space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white">{g.name}</h3>
                    <span className="text-xs text-gray-400 font-semibold">{g.category}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">{g.badge}</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-500">Saved: ₹{g.saved.toLocaleString()} of ₹{g.target.toLocaleString()}</span>
                  <span className="text-blue-600">{g.percent}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${g.percent}%` }}></div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-center text-xs">
                <div className="bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="text-[10px] text-gray-400 font-extrabold uppercase">Monthly</div>
                  <div className="font-extrabold text-blue-600 mt-0.5">₹{g.monthly.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="text-[10px] text-gray-400 font-extrabold uppercase">Completion</div>
                  <div className="font-extrabold text-gray-900 dark:text-white mt-0.5">{g.completion}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="text-[10px] text-gray-400 font-extrabold uppercase">Remaining</div>
                  <div className="font-extrabold text-rose-500 mt-0.5">₹{(g.target - g.saved).toLocaleString()}</div>
                </div>
              </div>

              {/* Milestone Achievement Badges */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase">Milestones:</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">25% Done ✓</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">50% Done ✓</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${g.percent >= 75 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                  75% {g.percent >= 75 ? 'Done ✓' : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GoalsPlannerPage;
