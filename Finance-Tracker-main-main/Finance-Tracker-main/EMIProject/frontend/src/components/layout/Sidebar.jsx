import React from 'react';
import {
  LayoutDashboard, ArrowUpRight, ArrowDownLeft, Wallet, PieChart,
  TrendingUp, Target, BuildingColumns, ShieldHeart, FileText,
  Brain, ShieldAlert, BarChart3, Settings
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/', active: true },
  { name: 'Transactions', icon: ArrowUpRight, path: '/expenses/' },
  { name: 'Income', icon: ArrowDownLeft, path: '/expenses/wallet/' },
  { name: 'Expenses', icon: Wallet, path: '/expenses/' },
  { name: 'Budget', icon: PieChart, path: '/expenses/wallet/' },
  { name: 'Investments', icon: TrendingUp, path: '/investments/' },
  { name: 'Savings Goals', icon: Target, path: '/savings/' },
  { name: 'EMI Tracker', icon: BuildingColumns, path: '/loans/' },
  { name: 'Policy Management', icon: ShieldHeart, path: '/policies/' },
  { name: 'Document Vault', icon: FileText, path: '/documents/' },
  { name: 'AI Decision Engine', icon: Brain, path: '/api/v1/decision/health-score/', badge: 'AI' },
  { name: 'Fraud Detection', icon: ShieldAlert, path: '#', badge: 'Safe' },
  { name: 'Reports', icon: BarChart3, path: '/analytics/' },
  { name: 'Settings', icon: Settings, path: '#' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 fixed left-0 top-16 bottom-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 overflow-y-auto hidden md:block transition-colors duration-300">
      <div className="space-y-1">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.path}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                item.active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  item.badge === 'AI' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </aside>
  );
};
