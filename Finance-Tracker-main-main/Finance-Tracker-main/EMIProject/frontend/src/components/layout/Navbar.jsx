import React, { useState } from 'react';
import { Search, Bell, Sparkles, User, Sun, Moon, Command } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = ({ onOpenAiAssistant }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-opacity-80 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions, analytics or type '/'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-12 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <kbd className="absolute right-3 px-1.5 py-0.5 text-xs text-gray-400 bg-gray-200 dark:bg-gray-700 rounded flex items-center gap-0.5">
              <Command className="w-3 h-3" /> K
            </kbd>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* AI Trigger */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Ask FinShied Prime</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-800 transition-all"
            title="Toggle Dark / Light mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Notification Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-800 transition-all relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2 mb-3">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Notifications</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold">2 New</span>
                </div>
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex gap-3 text-xs">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Financial Health Updated</p>
                      <p className="text-gray-500 dark:text-gray-400">Score improved to 82/100 (+4 pts)</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
              S
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-gray-900 dark:text-white">Sangram</div>
              <div className="text-[10px] text-gray-400">Pro Account</div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
