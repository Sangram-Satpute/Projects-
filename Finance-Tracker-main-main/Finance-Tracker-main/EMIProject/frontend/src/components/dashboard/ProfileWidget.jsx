import React from 'react';
import { ShieldCheck, UserCheck, Key, Smartphone, Award } from 'lucide-react';

export const ProfileWidget = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-500" /> Security & Profile Matrix
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-xs font-bold">95% Secure</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
          <div className="text-[10px] text-gray-400 font-bold uppercase">Security Score</div>
          <div className="text-lg font-extrabold text-emerald-500 mt-1">95 / 100</div>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800">
          <div className="text-[10px] text-gray-400 font-bold uppercase">KYC Verification</div>
          <div className="text-xs font-bold text-gray-900 dark:text-white mt-2 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Verified
          </div>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><Smartphone className="w-3.5 h-3.5" /> 2FA Authentication</span>
          <span className="font-bold text-emerald-500">Enabled</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><Key className="w-3.5 h-3.5" /> Document Vault PIN</span>
          <span className="font-bold text-emerald-500">Active</span>
        </div>
      </div>
    </div>
  );
};
