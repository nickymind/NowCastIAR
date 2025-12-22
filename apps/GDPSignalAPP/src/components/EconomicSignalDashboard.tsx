"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface EconomicData {
  ym: string;
  signal_score: number | null;
  regime: string;
  yhat: number | null;
}

const CSV_URL = "https://raw.githubusercontent.com/nickymind/NowCastIAR/main/data/emae_signal_app.csv";

const EconomicSignalDashboard: React.FC = () => {
  const [data, setData] = useState<EconomicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CSV_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData: EconomicData[] = results.data.map((row: any) => ({
              ym: row.ym,
              signal_score: row.signal_score === "" ? null : Number(row.signal_score),
              regime: row.regime,
              yhat: row.yhat === "" ? null : Number(row.yhat),
            }));
            setData(parsedData);
            setLoading(false);
          },
          error: (err) => {
            setError(`Failed to parse CSV: ${err.message}`);
            setLoading(false);
          },
        });
      } catch (e: any) {
        setError(`Failed to fetch data: ${e.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading economic signal…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        Error: {error}
      </div>
    );
  }

  const validSignalData = data.filter(
    (d) => d.signal_score !== null && d.signal_score !== undefined
  );

  if (validSignalData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        No valid economic signal data available to display.
      </div>
    );
  }

  // Find the latest row with a non-null signal_score for KPI cards
  const latestKpiData = validSignalData[validSignalData.length - 1];

  const getRegimeColor = (regime: string) => {
    switch (regime) {
      case "Expansión":
        return "text-green-600";
      case "Transición":
        return "text-yellow-600";
      case "Contracción":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Argentina Economic Signal
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signal Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestKpiData.signal_score !== null
                ? latestKpiData.signal_score.toFixed(2)
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              (Latest non-empty score)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Economic Regime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getRegimeColor(
                latestKpiData.regime
              )}`}
            >
              {latestKpiData.regime || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              (Latest non-empty score)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EMAE YoY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestKpiData.yhat !== null
                ? latestKpiData.yhat.toFixed(2) + "%"
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              (Latest non-empty score)
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <h2 className="text-2xl font-semibold text-center mb-6">
        Signal Score Over Time
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-md h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={validSignalData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis dataKey="ym" tickFormatter={(tick) => tick.substring(0, 7)} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="signal_score"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name="Signal Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EconomicSignalDashboard;