import React, { useState } from 'react';
import { Sparkles, Quote, Lightbulb, RefreshCw } from 'lucide-react';

const QUOTES = [
  "Don't save what is left after spending; spend what is left after saving. — Warren Buffett",
  "Small savings today create financial freedom tomorrow.",
  "Financial discipline beats financial luck every single time.",
  "Every rupee should have a purpose."
];

const TIPS = [
  "Tip: Setting a 20% savings buffer before discretionary spending increases your wealth growth rate by 2.4x.",
  "Tip: Reviewing recurring subscriptions every 90 days saves an average of ₹3,500/year.",
  "Tip: Maintain at least 3 months of living expenses in high-yield liquid wallets."
];

export const HeroSection = ({ username = "Sagar", healthScore = 82, grade = "A+" }) => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [tipIdx, setTipIdx] = useState(0);

  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % QUOTES.length);
    setTipIdx((prev) => (prev + 1) % TIPS.length);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-8 backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Greeting */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" /> FinShield Prime Intelligence Platform
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Good Morning, {username} 👋
          </h1>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            Here is your real-time personal financial matrix and AI advisory summary for today.
          </p>
        </div>

        {/* Right Health Score Pill */}
        <div className="flex items-center gap-4 bg-white/60 dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 backdrop-blur-md">
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Financial Health</div>
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">{healthScore} <span className="text-xs text-gray-400">/ 100</span></div>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold">
            Grade {grade}
          </span>
        </div>

      </div>

      {/* Quote & Tip Rotator Bar */}
      <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-800/50 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2 bg-white/40 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
          <Quote className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="italic italic flex-1">"{QUOTES[quoteIdx]}"</span>
          <button onClick={nextQuote} className="hover:text-blue-500 transition-colors p-1" title="Next quote">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-white/40 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="flex-1">{TIPS[tipIdx]}</span>
        </div>
      </div>
    </div>
  );
};
