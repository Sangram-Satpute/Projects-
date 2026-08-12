import React, { useState } from 'react';
import { FraudToolbar } from '../components/fraud_detection/FraudToolbar';
import { FraudOverviewKpiBar } from '../components/fraud_detection/FraudOverviewKpiBar';
import { ShieldCheck, AlertTriangle, CheckCircle2, ShieldAlert, Eye, Lock, MapPin } from 'lucide-react';

export function FraudDetectionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');

  const transactions = [
    { id: 'TX-9041', merchant: 'Apple Store Regent St', amount: '₹1,40,000', location: 'London, UK', riskScore: 12, riskLevel: 'LOW', status: 'SAFE', time: '12 mins ago' },
    { id: 'TX-8932', merchant: 'CryptoX Exchange Inc', amount: '₹85,000', location: 'Tallinn, EE', riskScore: 78, riskLevel: 'HIGH', status: 'REVIEW', time: '1 hour ago' },
    { id: 'TX-8819', merchant: 'Swiggy Gourmet Delhi', amount: '₹1,850', location: 'New Delhi, IN', riskScore: 4, riskLevel: 'LOW', status: 'SAFE', time: '3 hours ago' },
    { id: 'TX-8742', merchant: 'Unknown Tech LLC', amount: '₹45,000', location: 'Lagos, NG', riskScore: 92, riskLevel: 'CRITICAL', status: 'SUSPICIOUS', time: '5 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <FraudToolbar
        onRefresh={() => alert('Refreshing live fraud monitoring feed...')}
        onExport={() => alert('Exporting PDF Fraud Security Audit Report...')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        riskFilter={riskFilter}
        setRiskFilter={setRiskFilter}
      />

      {/* 1. Fraud Overview KPI Bar */}
      <FraudOverviewKpiBar />

      {/* 2. AI Explainable Fraud Anomaly Deep Dive */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-purple-500" /> AI Explainable Fraud Risk Analysis
          </h3>
          <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">1 Flagged Anomaly</span>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex justify-between items-center font-bold text-gray-900 dark:text-white">
            <span>TX-8742: Unknown Tech LLC (₹45,000)</span>
            <span className="text-rose-500 font-extrabold">Risk Score: 92/100 (CRITICAL)</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-white">Why Flagged: </strong>
            First-time international merchant (Lagos, NG) with 0 prior device fingerprint trust. Device IP does not match card billing country.
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-amber-500/20 text-[11px] font-semibold">
            <span className="text-purple-600 dark:text-purple-400">Confidence Rating: 99.1%</span>
            <span className="text-emerald-600 dark:text-emerald-400">Suggested Action: Block & Require OTP 2FA</span>
          </div>
        </div>
      </div>

      {/* 3. Transaction Risk Analysis Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-500" /> Live Transaction Risk Scoring Ledger
          </h3>
          <span className="text-xs font-bold text-gray-400">Auto-Refreshed Live</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-extrabold text-[10px]">
                <th className="pb-3 px-2">Tx ID</th>
                <th className="pb-3 px-2">Merchant Name</th>
                <th className="pb-3 px-2">Location</th>
                <th className="pb-3 px-2">Risk Score</th>
                <th className="pb-3 px-2">Risk Level</th>
                <th className="pb-3 px-2 text-right">Amount</th>
                <th className="pb-3 px-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-semibold">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3 px-2 text-gray-400">{tx.id}</td>
                  <td className="py-3 px-2 text-gray-900 dark:text-white font-extrabold">{tx.merchant}</td>
                  <td className="py-3 px-2 text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {tx.location}
                  </td>
                  <td className="py-3 px-2 font-extrabold">{tx.riskScore}/100</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      tx.riskLevel === 'CRITICAL' ? 'bg-rose-500/10 text-rose-500' :
                      tx.riskLevel === 'HIGH' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {tx.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right font-extrabold text-gray-900 dark:text-white">{tx.amount}</td>
                  <td className="py-3 px-2 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      tx.status === 'SAFE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FraudDetectionPage;
