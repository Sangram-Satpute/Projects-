import React, { useState } from 'react';
import { Brain, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Loader2 } from 'lucide-react';

export const AffordabilitySimulatorWidget = () => {
  const [name, setName] = useState('iPhone 16 Pro');
  const [amount, setAmount] = useState('140000');
  const [category, setCategory] = useState('Electronics');
  const [paymentType, setPaymentType] = useState('LUMP_SUM');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    decision: 'YES',
    score: 85,
    explanation: 'Your current liquid assets (₹2,45,000) comfortably cover this ₹1,40,000 purchase while leaving ₹1,05,000 (3.2 months buffer).',
    remainingBalance: '₹1,05,000',
    cashflowImpact: '-₹1,40,000 Lump Sum',
    suggestedWait: '0 Days (Immediate)'
  });

  const handleSimulate = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const numAmt = parseFloat(amount);
      if (numAmt > 200000) {
        setResult({
          decision: 'NO',
          score: 15,
          explanation: `Purchase amount (₹${numAmt.toLocaleString()}) exceeds total liquid reserves. Would reduce emergency cushion to 0.`,
          remainingBalance: '₹0 (Deficit)',
          cashflowImpact: '-₹' + numAmt.toLocaleString(),
          suggestedWait: '6 Months'
        });
      } else if (numAmt > 100000) {
        setResult({
          decision: 'WAIT',
          score: 62,
          explanation: `Purchase (₹${numAmt.toLocaleString()}) reduces liquid cushion below 4 months. Consider waiting 45 days or opting for 0% EMI.`,
          remainingBalance: `₹${(245000 - numAmt).toLocaleString()}`,
          cashflowImpact: paymentType === 'EMI' ? '-₹12,000 / mo EMI' : `-₹${numAmt.toLocaleString()} Lump Sum`,
          suggestedWait: '45 Days'
        });
      } else {
        setResult({
          decision: 'YES',
          score: 90,
          explanation: `Purchase amount (₹${numAmt.toLocaleString()}) fits easily within liquid reserves. DTI stays safely under 20%.`,
          remainingBalance: `₹${(245000 - numAmt).toLocaleString()}`,
          cashflowImpact: `-₹${numAmt.toLocaleString()}`,
          suggestedWait: '0 Days (Immediate)'
        });
      }
      setLoading(false);
    }, 400);
  };

  const getVerdictBadge = (dec) => {
    switch (dec) {
      case 'YES':
        return <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Verdict: YES</span>;
      case 'WAIT':
        return <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Verdict: WAIT</span>;
      case 'NO':
        return <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Verdict: NO</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 mb-6 shadow-sm">
      <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-purple-500" /> "Can I Afford This?" Purchase Simulator
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Form Inputs */}
        <form onSubmit={handleSimulate} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Purchase / Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. MacBook Pro"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="140000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Payment Type</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
              >
                <option value="LUMP_SUM">Lump Sum</option>
                <option value="EMI">EMI Loan</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
            <span>Run AI Affordability Simulation</span>
          </button>
        </form>

        {/* Results Card */}
        <div className="bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              {getVerdictBadge(result.decision)}
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                Affordability Score: {result.score}/100
              </span>
            </div>

            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {result.explanation}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
            <div>
              <div className="text-[10px] font-bold text-gray-400">Post-Liquid Fund</div>
              <div className="text-xs font-extrabold text-gray-900 dark:text-white mt-0.5">{result.remainingBalance}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400">Cash Flow Impact</div>
              <div className="text-xs font-extrabold text-rose-500 mt-0.5">{result.cashflowImpact}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400">Suggested Wait</div>
              <div className="text-xs font-extrabold text-blue-500 mt-0.5">{result.suggestedWait}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
