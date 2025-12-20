"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const modelInputs = [
  { indicator: "EMAE YoY", description: "Lagged values of the target variable" },
  { indicator: "Industrial Production Index (INDEC)", description: "Monthly index of industrial activity" },
  { indicator: "Construction Activity Index (ISAC)", description: "Monthly index of construction activity" },
  { indicator: "Consumer Confidence Index (UTDT)", description: "Survey-based measure of consumer sentiment" },
  { indicator: "Official Exchange Rate", description: "Monthly change in the official USD/ARS exchange rate" },
];

const ModelSection: React.FC = () => {
  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Model Inputs & Methodology</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-medium mb-4">Model Inputs</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Indicator</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modelInputs.map((input, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{input.indicator}</TableCell>
                <TableCell className="text-muted-foreground">{input.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h3 className="text-xl font-medium mt-8 mb-4">Methodology</h3>
        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          This nowcasting model operates at a monthly frequency, with the target variable being the year-over-year variation of Argentina's Economic Activity (EMAE YoY). The model employs a Lasso Regression algorithm, known for its ability to perform variable selection and regularization, which helps in handling multicollinearity and preventing overfitting. The model is trained on a rolling window of 5 years of historical data, allowing it to adapt to recent economic trends and maintain relevance.
        </p>
      </CardContent>
    </Card>
  );
};

export default ModelSection;