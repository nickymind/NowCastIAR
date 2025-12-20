"use client";

import React from 'react';
import { MadeWithDyad } from '@/components/made-with-dyad';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 flex flex-col">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">GDPNowcastIArg</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
      <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default MainLayout;