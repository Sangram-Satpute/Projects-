import React, { useEffect } from 'react';
import { Search, Brain, ShieldCheck, Target, FolderClosed, Receipt, Calculator, Command } from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { label: 'AI Decision Engine', route: '/decision-engine/', icon: Brain, color: 'text-purple-500' },
    { label: 'AI Fraud Detection', route: '/fraud-detection/', icon: ShieldCheck, color: 'text-emerald-500' },
    { label: 'Savings Goals Planner', route: '/savings/', icon: Target, color: 'text-blue-500' },
    { label: 'Document Vault', route: '/documents/', icon: FolderClosed, color: 'text-indigo-500' },
    { label: 'Smart Transaction Center', route: '/expenses/', icon: Receipt, color: 'text-amber-500' },
    { label: 'EMI Calculator', route: '/calculator/', icon: Calculator, color: 'text-rose-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search page (Ctrl + K)..."
            className="w-full bg-transparent text-sm font-semibold text-gray-900 dark:text-white focus:outline-none"
          />
          <span className="text-[10px] font-bold text-gray-400 border border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded-md">ESC</span>
        </div>

        <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
          {commands.map((cmd, idx) => {
            const Icon = cmd.icon;
            return (
              <button
                key={idx}
                onClick={() => { onNavigate(cmd.route); onClose(); }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${cmd.color}`} />
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{cmd.label}</span>
                </div>
                <span className="text-[10px] font-semibold text-gray-400">Jump to Page</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
