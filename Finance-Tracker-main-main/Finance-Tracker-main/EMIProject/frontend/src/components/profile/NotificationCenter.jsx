import React, { useState } from 'react';
import { Bell, ShieldAlert, AlertTriangle, Calendar, Award, CheckCircle2, Trash2, Filter } from 'lucide-react';

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Budget Threshold Reached', desc: 'Food & Dining outlays hit 84% of monthly cap', category: 'BUDGET', priority: 'HIGH', time: '10 mins ago', read: false, icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10' },
    { id: 2, title: 'Upcoming Premium Renewal', desc: 'Star Health Optima ₹18,500 due in 42 days (Oct 15)', category: 'POLICY', priority: 'MEDIUM', time: '2 hours ago', read: false, icon: Calendar, color: 'text-purple-500 bg-purple-500/10' },
    { id: 3, title: 'Goal Milestone Achieved', desc: 'MacBook Pro M3 Max goal crossed 66% completion (₹1.2L saved)', category: 'GOAL', priority: 'LOW', time: '1 day ago', read: true, icon: Award, color: 'text-emerald-500 bg-emerald-500/10' },
    { id: 4, title: 'Location Anomaly Blocked', desc: 'Flagged TX-8742 from Lagos, NG required 2FA check', category: 'FRAUD', priority: 'CRITICAL', time: '2 days ago', read: true, icon: ShieldAlert, color: 'text-rose-500 bg-rose-500/10' }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotif = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <Bell className="w-4 h-4 text-purple-500" /> Smart Notification Center
        </h3>
        <button
          onClick={markAllRead}
          className="text-xs font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400 transition-colors"
        >
          Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                n.read
                  ? 'bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800'
                  : 'bg-purple-500/5 border-purple-500/20 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl ${n.color} shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-gray-900 dark:text-white">{n.title}</span>
                    <span className={`px-2 py-0.2 rounded text-[9px] font-extrabold ${
                      n.priority === 'CRITICAL' ? 'bg-rose-500/10 text-rose-500' :
                      n.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {n.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n.desc}</p>
                  <span className="text-[10px] text-gray-400 font-semibold block mt-1">{n.time}</span>
                </div>
              </div>

              <button
                onClick={() => deleteNotif(n.id)}
                className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
