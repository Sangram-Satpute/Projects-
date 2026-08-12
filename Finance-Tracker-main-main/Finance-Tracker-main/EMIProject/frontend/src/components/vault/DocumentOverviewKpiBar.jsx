import React from 'react';
import { FolderClosed, CheckCircle2, AlertCircle, HardDrive, Cpu, Clock } from 'lucide-react';

export const DocumentOverviewKpiBar = () => {
  const kpis = [
    { label: 'Total Documents', value: '18 Vaulted', sub: '11 Categories', icon: FolderClosed, color: 'text-purple-500 bg-purple-500/10' },
    { label: 'Verified Status', value: '16 Verified', sub: '100% Validated', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
    { label: 'Expiring Soon', value: '2 Documents', sub: 'Action Required', icon: AlertCircle, color: 'text-amber-500 bg-amber-500/10' },
    { label: 'Storage Used', value: '42.8 MB', sub: 'of 5.0 GB Quota', icon: HardDrive, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'OCR Processed', value: '18 / 18', sub: 'Text Extracted', icon: Cpu, color: 'text-indigo-500 bg-indigo-500/10' },
    { label: 'Recently Uploaded', value: '4 This Month', sub: 'Latest: Tax FY26', icon: Clock, color: 'text-emerald-500 bg-emerald-500/10' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider truncate">{kpi.label}</span>
              <div className={`p-1.5 rounded-lg ${kpi.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-base font-extrabold text-gray-900 dark:text-white truncate">{kpi.value}</div>
            <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mt-0.5 truncate">{kpi.sub}</div>
          </div>
        );
      })}
    </div>
  );
};
