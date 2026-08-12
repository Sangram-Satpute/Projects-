import React from 'react';
import { NotificationCenter } from '../components/profile/NotificationCenter';
import { User, ShieldCheck, Calendar, Lock, KeyRound, Monitor, Smartphone, CheckCircle2, Moon, Globe } from 'lucide-react';

export function ProfileAndNotificationPage() {
  const calendarEvents = [
    { title: 'Star Health Policy Renewal', date: 'Oct 15, 2026', type: 'PREMIUM', amount: '₹18,500', badge: 'Policy' },
    { title: 'MacBook Savings Target', date: 'Nov 01, 2026', type: 'GOAL', amount: '₹15,000 / mo', badge: 'Savings' },
    { title: 'SIP Investment Auto-Debit', date: '5th of Every Month', type: 'SIP', amount: '₹5,000 / mo', badge: 'Mutual Fund' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* 1. Profile Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
            U
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">User Account</h1>
            <p className="text-xs text-gray-500 font-semibold">user@finshield.ai • Member since Jan 2026</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Security Rating: 92/100</span>
              <span className="text-[10px] font-extrabold text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded">Profile 88% Complete</span>
            </div>
          </div>
        </div>

        <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-colors">
          Edit Profile Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Notification Center */}
        <NotificationCenter />

        {/* 3. Financial Calendar Agenda Planner */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" /> Financial Calendar & Payment Agenda
            </h3>
            <span className="text-xs font-bold text-gray-400">Upcoming Events</span>
          </div>

          <div className="space-y-3">
            {calendarEvents.map((ev, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <div>
                  <div className="font-extrabold text-xs text-gray-900 dark:text-white">{ev.title}</div>
                  <div className="text-[11px] text-gray-400 font-semibold mt-0.5">{ev.date} • {ev.badge}</div>
                </div>
                <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400">{ev.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAndNotificationPage;
