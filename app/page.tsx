"use client";

import React, { useState, useEffect } from 'react';
import SignalDisplay from '@/components/SignalDisplay';
import SignalChart from '@/components/SignalChart';
import { loadEmaeSignalData, SignalDataPoint } from '@/utils/loadSignalData';
import { Skeleton } from '@/components/ui/skeleton';

const HomePage: React.FC = () => {
  const [data, setData] = useState<SignalDataPoint[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const signalData = await loadEmaeSignalData();
        setData(signalData);
      } catch (err) {
        setError((err as Error).message || 'An unknown error occurred.');
        console.error("Failed to load data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const latestData = data && data.length > 0 ? data[data.length - 1] : null;

  return (
    <div className="space-y-12">
      <h2 className="text-4xl font-extrabold text-center mb-8">Argentina Economic Signal</h2>
      {isLoading ? (
        <div className="space-y-8">
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>Error loading data: {error}</p>
          <p>Please ensure 'emae_signal_app.csv' is accessible at the specified GitHub URL.</p>
        </div>
      ) : (
        <>
          <SignalDisplay latestData={latestData} />
          <SignalChart data={data || []} />
          <div className="text-center text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            <p className="mb-4">
              This is a synthetic signal constructed from high-frequency indicators.
            </p>
            <p>
              The economic regime (Expansion, Transition, Contraction) is a classification of the signal's current state, not a forecast of future economic conditions.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;