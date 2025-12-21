"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignalDataPoint } from '@/utils/loadSignalData';

interface SignalDisplayProps {
  latestData: SignalDataPoint | null;
}

const getRegimeColor = (regime: 'Expansion' | 'Transition' | 'Contraction') => {
  switch (regime) {
    case 'Expansion':
      return 'text-green-600 dark:text-green-400';
    case 'Transition':
      return 'text-amber-500 dark:text-amber-400';
    case 'Contraction':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
};

const formatNumber = (v: number | null | undefined, decimals = 1) => {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  return v.toFixed(decimals);
};

const SignalDisplay: React.FC<SignalDisplayProps> = ({ latestData }) => {
  if (!latestData) {
    return (
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Economic Signal Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading signal data…</p>
        </CardContent>
      </Card>
    );
  }

  const regimeColorClass = getRegimeColor(latestData.economicRegime);

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Economic Signal Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Signal Score */}
        <div>
          <p className="text-sm text-muted-foreground">
            Signal Score (0–100)
          </p>
          <p className="text-5xl font-bold mt-2">
            {formatNumber(latestData.signalScore)}
          </p>
        </div>

        {/* Economic Regime */}
        <div>
          <p className="text-sm text-muted-foreground">
            Economic Regime
          </p>
          <p className={`text-4xl font-bold mt-2 ${regimeColorClass}`}>
            {latestData.economicRegime}
          </p>
        </div>

        {/* EMAE YoY */}
        <div>
          <p className="text-sm text-muted-foreground">
            Estimated EMAE YoY
          </p>
          <p className="text-5xl font-bold mt-2">
            {formatNumber(latestData.emaeYoY)}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalDisplay;