"use client";

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import { SignalDataPoint } from '@/utils/loadSignalData';

interface SignalChartProps {
  data: SignalDataPoint[];
}

const SignalChart: React.FC<SignalChartProps> = ({ data }) => {
  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Signal Score Over Time
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />

              <XAxis
                dataKey="date"
                tickFormatter={(d) =>
                  new Date(d).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short'
                  })
                }
                className="text-sm text-muted-foreground"
              />

              <YAxis
                domain={[0, 100]}
                className="text-sm text-muted-foreground"
              />

              <Tooltip
                labelFormatter={(d) =>
                  new Date(d).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short'
                  })
                }
                formatter={(value: number) => `${value.toFixed(1)}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  fontSize: '0.875rem'
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />

              <Line
                type="monotone"
                dataKey="signalScore"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalChart;