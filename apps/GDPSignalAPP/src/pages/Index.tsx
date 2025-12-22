"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import EconomicSignalDashboard from "@/components/EconomicSignalDashboard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <EconomicSignalDashboard />
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;