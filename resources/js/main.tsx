import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import Dashboard from '@/pages/dashboard';
import '../css/app.css';

initializeTheme();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <TooltipProvider delayDuration={0}>
      <Dashboard />
      <Toaster />
    </TooltipProvider>
  </React.StrictMode>,
);
