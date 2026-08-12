import React, { useState, useEffect } from 'react';
import { Search, Command, ArrowRight, Wallet, Brain, ShieldAlert, FileText, Settings, X } from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { title: 'Log New Expense', category: 'Actions', icon: Wallet, href: '/expenses/add/' },
    { title: 'Log Income Stream', category: 'Actions', icon: Wallet, href: '/expenses/wallet/' },
    { title: 'Run "Can I Afford This?" AI', category: 'AI Decision', icon: Brain, href: '/api/v1/decision/health-score/' },
    { title: 'Check Fraud Risk Score', category: 'Security', icon: ShieldAlert, href: '#' },
    { title: 'Upload Document to Vault', category: 'Vault', icon: FileText, href: '/documents/add/' },
    { title: 'Account Settings', category: 'System', icon: Settings, href: '#' },
  ];

  const filtered = actions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Type a command or search (e.g. 'Expense', 'Afford')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.map((act, idx) => {
            const Icon = act.icon;
            return (
              <a
                key={idx}
                href={act.href}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{act.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 group-hover:text-blue-100">{act.category}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-xs text-gray-400">
              No matching commands found.
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex justify-between text-[11px] text-gray-400">
          <span>Navigate with <strong>↑ ↓</strong></span>
          <span>Open with <strong>Ctrl+K</strong></span>
        </div>
      </div>
    </div>
  );
};
