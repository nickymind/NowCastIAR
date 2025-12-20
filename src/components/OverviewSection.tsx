"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { month: 'Jan', emaeYoY: 1.5, modelNowcast: 1.6 },
  { month: 'Feb', emaeYoY: 1.8, modelNowcast: 1.9 },
  { month: 'Mar', emaeYoY: 2.1, modelNowcast: 2.0 },
  { month: 'Apr', emaeYoY: 1.9, modelNowcast: 2.1 },
  { month: 'May', emaeYoY: 2.2, modelNowcast: 2.3 },
  { month: 'Jun', emaeYoY: 2.0, modelNowcast: 2.2 },
  { month: 'Jul', emaeYoY: 2.5, modelNowcast: 2.4 },
  { month: 'Aug', emaeYoY: 2.3, modelNowcast: 2.5 },
  { month: 'Sep', emaeYoY: 2.6, modelNowcast: 2.7 },
  { month: 'Oct', emaeYoY: 2.4, modelNowcast: 2.6 },
  { month: 'Nov', emaeYoY: 2.7, modelNowcast: 2.8 },
  { month: 'Dec', emaeYoY: 2.5, modelNowcast: 2.3 }, // Current nowcast
];

const OverviewSection: React.FC = () => {
  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Nowcast EMAE YoY: +2.3%</CardTitle>
        <p className="text-lg text-muted-foreground text-center">Exploratory estimate based on activity, consumption and financial indicators.</p>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-sm text-muted-foreground" />
              <YAxis className="text-sm text-muted-foreground" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Line type="monotone" dataKey="emaeYoY" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} name="Historical EMAE YoY" />
              <Line type="monotone" dataKey="modelNowcast" stroke="hsl(var(--accent))" name="Model Nowcast" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-6 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Nowcasting involves using high-frequency data to estimate the current state of an economic indicator before official data is released. This application provides an exploratory nowcast for Argentina's Economic Activity (EMAE YoY), combining various macroeconomic indicators with machine learning techniques. It's important to note that these estimates are preliminary and subject to revision as more data becomes available.
        </p>
      </CardContent>
    </Card>
  );
};

export default OverviewSection;