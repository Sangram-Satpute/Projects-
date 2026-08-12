import React from 'react';
import { Calendar } from 'lucide-react';

export const SpendingHeatmap = () => {
  // Generate 52 weeks x 7 days intensity matrix (dummy spending intensity 0 to 4)
  const weeks = Array.from({ length: 30 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const val = Math.floor(Math.random() * 5);
      return val;
    })
  );

  const getColor = (level) => {
    switch (level) {
      case 0: return 'bg-gray-100 dark:bg-gray-800';
      case 1: return 'bg-emerald-200 dark:bg-emerald-950/60';
      case 2: return 'bg-emerald-400 dark:bg-emerald-700';
      case 3: return 'bg-emerald-600 dark:bg-emerald-500';
      case 4: return 'bg-emerald-800 dark:bg-emerald-400';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-500" /> Spending Heatmap (365 Days Overview)
        </h3>
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-xs bg-gray-100 dark:bg-gray-800"></div>
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-200 dark:bg-emerald-950"></div>
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-400 dark:bg-emerald-700"></div>
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-600 dark:bg-emerald-500"></div>
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-800 dark:bg-emerald-400"></div>
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-1">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((level, dIdx) => (
                <div
                  key={dIdx}
                  className={`w-3 h-3 rounded-xs ${getColor(level)} transition-colors hover:ring-2 hover:ring-blue-500 cursor-pointer`}
                  title={`Day ${wIdx * 7 + dIdx + 1}: Spending Intensity Level ${level}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
