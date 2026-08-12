import React from 'react';
import { Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const EVENTS = [
  { date: '10 Aug', title: 'HDFC Home Loan EMI', amount: '₹14,500', type: 'EMI', status: 'Upcoming', color: 'text-amber-500 bg-amber-500/10' },
  { date: '15 Aug', title: 'Term Insurance Premium', amount: '₹8,200', type: 'POLICY', status: 'Due Soon', color: 'text-rose-500 bg-rose-500/10' },
  { date: '25 Aug', title: 'Royal Enfield Goal Milestone', amount: '₹15,000', type: 'GOAL', status: 'On Track', color: 'text-emerald-500 bg-emerald-500/10' },
];

export const CalendarWidget = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-blue-500" /> Financial Events Calendar
        </h3>
        <span className="text-xs text-gray-400 font-medium">August 2026</span>
      </div>

      <div className="space-y-3">
        {EVENTS.map((evt, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-extrabold text-xs flex flex-col items-center justify-center">
                <span>{evt.date.split(' ')[0]}</span>
                <span className="text-[9px] font-normal uppercase">{evt.date.split(' ')[1]}</span>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{evt.title}</div>
                <div className="text-[11px] text-gray-400">{evt.amount} • {evt.type}</div>
              </div>
            </div>

            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${evt.color}`}>
              {evt.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
