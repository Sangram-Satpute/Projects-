import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { HeroSection } from './components/dashboard/HeroSection';
import { CalendarWidget } from './components/dashboard/CalendarWidget';
import { ProfileWidget } from './components/dashboard/ProfileWidget';
import { SavingsGoalsWidget } from './components/dashboard/SavingsGoalsWidget';
import { FloatingAiAssistant } from './components/dashboard/FloatingAiAssistant';

export function App() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
        <Navbar onOpenAiAssistant={() => setIsCommandOpen(true)} />
        <Sidebar />

        <main className="md:pl-64 pt-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          <HeroSection username="Sagar" healthScore={82} grade="A+" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SavingsGoalsWidget />
            <CalendarWidget />
            <ProfileWidget />
          </div>
        </main>

        <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
        <FloatingAiAssistant />
      </div>
    </ThemeProvider>
  );
}

export default App;
