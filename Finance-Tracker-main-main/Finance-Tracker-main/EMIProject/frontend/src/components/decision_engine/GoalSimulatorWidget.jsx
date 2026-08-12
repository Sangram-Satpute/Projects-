import React, { useState } from 'react';
import { Target, Bike, Laptop, Palmtree, ShieldAlert, PlusCircle } from 'lucide-react';

export const GoalSimulatorWidget = () => {
  const [activeGoal, setActiveGoal] = useState('laptop');

  const goals = {
    laptop: { title: 'MacBook Pro M3', icon: Laptop, targetAmount: 180000, currentSaved: 120000, progress: 66, reqMonthly: 15000, estCompletion: 'Nov 2026', probability: 94, suggestion: 'Saving ₹15,000/mo achieves this goal in 4 months without touching emergency reserves.' },
    bike: { title: 'Royal Enfield Hunter', icon: Bike, targetAmount: 220000, currentSaved: 85000, progress: 38, reqMonthly: 12000, estCompletion: 'Mar 2027', probability: 88, suggestion: 'Reallocating ₹3,000 from monthly dining out reduces completion time by 2 months.' },
    vacation: { title: 'Japan Autumn Tour', icon: Palmtree, targetAmount: 300000, currentSaved: 150000, progress: 50, reqMonthly: 25000, estCompletion: 'Oct 2026', probability: 91, suggestion: 'Automated weekly transfer of ₹6,250 keeps your travel fund right on track.' },
    emergency: { title: '6-Month Emergency Cushion', icon: ShieldAlert, targetAmount: 300000, currentSaved: 245000, progress: 82, reqMonthly: 18000, estCompletion: 'Sep 2026', probability: 98, suggestion: 'Your safety cushion is 82% complete. 3 more cycles reach full 6-month coverage.' }
  };

  const cur = goals[activeGoal];
  const Icon = cur.icon;

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-500" /> Goal Simulation & Target Tracking
        </h3>
        <span className="text-xs font-bold text-gray-400">4 Active Simulations</span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {Object.keys(goals).map((key) => {
          const item = goals[key];
          const TabIcon = item.icon;
          const isActive = activeGoal === key;
          return (
            <button
              key={key}
              onClick={() => setActiveGoal(key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5" />
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Goal Simulator Body */}
      <div className="bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-gray-900 dark:text-white">{cur.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                Saved ₹{cur.currentSaved.toLocaleString()} of ₹{cur.targetAmount.toLocaleString()} ({cur.progress}%)
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {cur.probability}% Success Probability
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden mb-4">
          <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${cur.progress}%` }}></div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4 text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="text-[10px] font-bold text-gray-400">Req. Monthly Savings</div>
            <div className="font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">₹{cur.reqMonthly.toLocaleString()} / mo</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="text-[10px] font-bold text-gray-400">Est. Completion</div>
            <div className="font-extrabold text-gray-900 dark:text-white mt-0.5">{cur.estCompletion}</div>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 col-span-2 sm:col-span-1">
            <div className="text-[10px] font-bold text-gray-400">Remaining Gap</div>
            <div className="font-extrabold text-rose-500 mt-0.5">₹{(cur.targetAmount - cur.currentSaved).toLocaleString()}</div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 text-xs font-medium">
          💡 <strong className="font-bold">AI Goal Suggestion: </strong> {cur.suggestion}
        </div>
      </div>
    </div>
  );
};
