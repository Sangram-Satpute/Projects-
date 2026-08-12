import React from 'react';
import { SmartQuickActionsToolbar } from '../components/decision_engine/SmartQuickActionsToolbar';
import { HealthScoreCard } from '../components/decision_engine/HealthScoreCard';
import { AffordabilitySimulatorWidget } from '../components/decision_engine/AffordabilitySimulatorWidget';
import { GoalSimulatorWidget } from '../components/decision_engine/GoalSimulatorWidget';
import { TrendingUp, Clock, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function DecisionEnginePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <SmartQuickActionsToolbar
        onOpenAfford={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
        onOpenGoal={() => window.scrollTo({ top: 700, behavior: 'smooth' })}
        onOpenForecast={() => alert('Opening 360-Day Cashflow Forecast Modal...')}
        onExportReport={() => alert('Generating FinShield Prime Executive Report...')}
      />

      {/* 1. Health Score Card */}
      <HealthScoreCard />

      {/* 2. "Can I Afford This?" Purchase Simulator */}
      <AffordabilitySimulatorWidget />

      {/* 3. Goal Simulation Widget */}
      <GoalSimulatorWidget />

      {/* 4. Grid of Decision History & Future Cash Flow Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Forecast Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" /> 360-Day Cash Flow Forecast
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-md">98% Confidence</span>
          </div>

          <div className="space-y-3 text-xs mb-4">
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex justify-between">
              <span>Next 30 Days Surplus:</span>
              <strong className="text-emerald-600 dark:text-emerald-400">+₹53,200</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex justify-between">
              <span>Next 90 Days Cumulative:</span>
              <strong className="text-emerald-600 dark:text-emerald-400">+₹1,62,000</strong>
            </div>
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex justify-between">
              <span>Next 365 Days Projection:</span>
              <strong className="text-purple-600 dark:text-purple-400">+₹6,60,000</strong>
            </div>
          </div>
        </div>

        {/* Decision History Table */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" /> Decision History Log
            </h4>
            <span className="text-[10px] font-bold text-gray-400">Last 3 Simulations</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <div>
                <div className="font-extrabold text-gray-900 dark:text-white">iPhone 16 Pro (₹1,40,000)</div>
                <div className="text-[10px] text-gray-400">Aug 03, 2026 • Lump Sum</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-500">YES (85/100)</span>
            </div>

            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <div>
                <div className="font-extrabold text-gray-900 dark:text-white">BMW G310 GS (₹3,50,000)</div>
                <div className="text-[10px] text-gray-400">Jul 28, 2026 • EMI</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-500/10 text-rose-500">NO (15/100)</span>
            </div>

            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <div>
                <div className="font-extrabold text-gray-900 dark:text-white">Sony OLED TV (₹85,000)</div>
                <div className="text-[10px] text-gray-400">Jul 14, 2026 • Lump Sum</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/10 text-amber-500">WAIT (62/100)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DecisionEnginePage;
