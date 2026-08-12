import React, { useState } from 'react';
import { TransactionToolbar } from '../components/transactions/TransactionToolbar';
import { TransactionOverviewKpiBar } from '../components/transactions/TransactionOverviewKpiBar';
import { Receipt, Plus, ArrowUpRight, ArrowDownLeft, QrCode, FileUp, ShieldHeart, Brain, ShieldAlert, FileText, Keyboard, CheckCircle2 } from 'lucide-react';

export function TransactionCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const transactions = [
    { id: 'TX-9041', merchant: 'Apple Store Regent St', category: 'Electronics', amount: '₹1,40,000', type: 'EXPENSE', wallet: 'Main Bank Wallet', mode: 'Credit Card', status: 'CLEARED', risk: 12, date: 'Aug 03, 2026' },
    { id: 'TX-9040', merchant: 'Monthly Salary Credit', category: 'Income', amount: '₹80,000', type: 'INCOME', wallet: 'HDFC Salary Account', mode: 'NEFT Transfer', status: 'CLEARED', risk: 0, date: 'Aug 01, 2026' },
    { id: 'TX-9039', merchant: 'Swiggy Gourmet Delhi', category: 'Food & Dining', amount: '₹1,850', type: 'EXPENSE', wallet: 'UPI Wallet', mode: 'Google Pay', status: 'CLEARED', risk: 4, date: 'Jul 30, 2026' },
    { id: 'TX-9038', merchant: 'Uber India Mobility', category: 'Transport', amount: '₹620', type: 'EXPENSE', wallet: 'Paytm Wallet', mode: 'UPI AutoPay', status: 'CLEARED', risk: 2, date: 'Jul 29, 2026' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <TransactionToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        onAddExpense={() => alert('Opening Add Expense Modal...')}
        onAddIncome={() => alert('Opening Add Income Modal...')}
        onExport={() => alert('Exporting Transaction Ledger CSV...')}
      />

      <TransactionOverviewKpiBar />

      {/* Quick Action Launcher Grid */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-3">
        <h3 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider text-gray-400">12 Quick Action Launchers</h3>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => alert('Add Expense')} className="px-3 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-blue-700 transition-colors"><Plus className="w-3.5 h-3.5" /> + Add Expense</button>
          <button onClick={() => alert('Add Income')} className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-emerald-700 transition-colors"><ArrowDownLeft className="w-3.5 h-3.5" /> + Add Income</button>
          <button onClick={() => alert('Scan Receipt')} className="px-3 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-purple-700 transition-colors"><QrCode className="w-3.5 h-3.5" /> Scan Receipt</button>
          <button onClick={() => alert('Vault Upload')} className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-xs flex items-center gap-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"><FileUp className="w-3.5 h-3.5" /> Vault Upload</button>
          <button onClick={() => alert('Policy')} className="px-3 py-2 rounded-xl bg-rose-500/10 text-rose-500 font-bold text-xs flex items-center gap-1.5 hover:bg-rose-500/20 transition-colors"><ShieldHeart className="w-3.5 h-3.5" /> Add Policy</button>
          <button onClick={() => alert('Can I Afford This')} className="px-3 py-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-xs flex items-center gap-1.5 hover:bg-purple-500/20 transition-colors"><Brain className="w-3.5 h-3.5" /> Can I Afford This?</button>
        </div>
      </div>

      {/* Advanced Transaction Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Receipt className="w-4 h-4 text-blue-500" /> Real-Time Financial Ledger Data Grid
          </h3>
          <span className="text-xs font-bold text-gray-400">Showing 4 of 148 Transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-extrabold text-[10px]">
                <th className="pb-3 px-2">Tx ID</th>
                <th className="pb-3 px-2">Merchant Title</th>
                <th className="pb-3 px-2">Category</th>
                <th className="pb-3 px-2">Wallet / Mode</th>
                <th className="pb-3 px-2">Risk Score</th>
                <th className="pb-3 px-2 text-right">Amount</th>
                <th className="pb-3 px-2 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-semibold">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3.5 px-2 text-gray-400">{tx.id}</td>
                  <td className="py-3.5 px-2 text-gray-900 dark:text-white font-extrabold">{tx.merchant}</td>
                  <td className="py-3.5 px-2"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-extrabold text-[10px]">{tx.category}</span></td>
                  <td className="py-3.5 px-2 text-gray-500">{tx.wallet} • {tx.mode}</td>
                  <td className="py-3.5 px-2 font-extrabold text-emerald-500">{tx.risk}/100</td>
                  <td className={`py-3.5 px-2 text-right font-extrabold ${tx.type === 'INCOME' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'}{tx.amount}
                  </td>
                  <td className="py-3.5 px-2 text-right text-gray-400">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionCenterPage;
