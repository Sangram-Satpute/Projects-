import React, { useState } from 'react';
import { VaultToolbar } from '../components/vault/VaultToolbar';
import { DocumentOverviewKpiBar } from '../components/vault/DocumentOverviewKpiBar';
import { FolderClosed, FileText, ShieldHeart, Lock, Eye, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function VaultAndPolicyPage() {
  const [activeTab, setActiveTab] = useState('DOCUMENTS');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const documents = [
    { id: 'DOC-101', name: 'Aadhaar Card National ID', category: 'Government ID', date: 'Jan 12, 2026', expiry: 'Permanent', ocr: 'COMPLETED', size: '1.2 MB', verified: true },
    { id: 'DOC-102', name: 'PAN Card Official Copy', category: 'Tax ID', date: 'Feb 04, 2026', expiry: 'Permanent', ocr: 'COMPLETED', size: '850 KB', verified: true },
    { id: 'DOC-103', name: 'Indian Passport (10-Yr)', category: 'Travel ID', date: 'Mar 18, 2026', expiry: 'Aug 2034', ocr: 'COMPLETED', size: '2.4 MB', verified: true },
    { id: 'DOC-104', name: 'Form 16 Tax Return FY26', category: 'Tax Documents', date: 'Jun 22, 2026', expiry: 'FY 2025-26', ocr: 'COMPLETED', size: '3.1 MB', verified: true }
  ];

  const policies = [
    { id: 'POL-301', name: 'Star Health Optima Plan', provider: 'Star Health Insurance', policyNo: 'SHI-984021', coverage: '₹25,00,000', premium: '₹18,500 / yr', nextDue: 'Oct 15, 2026', nominee: 'Priya Sharma (Spouse)' },
    { id: 'POL-302', name: 'HDFC Life Click 2 Protect', provider: 'HDFC Life Insurance', policyNo: 'HDFC-441092', coverage: '₹1,00,00,000', premium: '₹32,000 / yr', nextDue: 'Dec 01, 2026', nominee: 'Priya Sharma (Spouse)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <VaultToolbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onUpload={() => alert(activeTab === 'DOCUMENTS' ? 'Opening Document Upload Modal...' : 'Opening Policy Addition Modal...')}
      />

      <DocumentOverviewKpiBar />

      {/* Main Content View */}
      {activeTab === 'DOCUMENTS' ? (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-500" /> PIN-Protected Vault Storage Ledger
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">AES-256 Encrypted</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-extrabold text-[10px]">
                  <th className="pb-3 px-2">Doc ID</th>
                  <th className="pb-3 px-2">Document Name</th>
                  <th className="pb-3 px-2">Category</th>
                  <th className="pb-3 px-2">Expiry Date</th>
                  <th className="pb-3 px-2">OCR Extraction</th>
                  <th className="pb-3 px-2 text-right">Size</th>
                  <th className="pb-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-semibold">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 px-2 text-gray-400">{doc.id}</td>
                    <td className="py-3 px-2 text-gray-900 dark:text-white font-extrabold">{doc.name}</td>
                    <td className="py-3 px-2"><span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-extrabold text-[10px]">{doc.category}</span></td>
                    <td className="py-3 px-2 text-gray-500">{doc.expiry}</td>
                    <td className="py-3 px-2"><span className="text-emerald-500 font-extrabold text-[10px]">OCR Done ✓</span></td>
                    <td className="py-3 px-2 text-right text-gray-400">{doc.size}</td>
                    <td className="py-3 px-2 text-right"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-extrabold text-[10px]">VERIFIED</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((pol) => (
            <div key={pol.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    <ShieldHeart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white">{pol.name}</h3>
                    <span className="text-xs text-gray-400 font-semibold">{pol.provider} • {pol.policyNo}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">ACTIVE</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-center text-xs">
                <div className="bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="text-[10px] text-gray-400 font-extrabold uppercase">Coverage</div>
                  <div className="font-extrabold text-emerald-600 mt-0.5">{pol.coverage}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="text-[10px] text-gray-400 font-extrabold uppercase">Premium</div>
                  <div className="font-extrabold text-purple-600 mt-0.5">{pol.premium}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="text-[10px] text-gray-400 font-extrabold uppercase">Next Due</div>
                  <div className="font-extrabold text-amber-500 mt-0.5">{pol.nextDue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VaultAndPolicyPage;
