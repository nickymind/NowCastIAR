"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExplanationSection: React.FC = () => {
  const nowcastValue = 2.3;
  const topFeatures = "Índice de Producción Industrial (IPI), Índice Sintético de la Actividad de la Construcción (ISAC) y el Índice de Confianza del Consumidor";
  const dataCutoff = "noviembre de 2024";

  const explanationText = `
    Estimación Exploratoria del EMAE Interanual (YoY) para Argentina: ${dataCutoff}

    El presente nowcast indica un valor de +${nowcastValue}% para la variación interanual del Estimador Mensual de Actividad Económica (EMAE) en Argentina, con fecha de corte en ${dataCutoff}. Esta proyección es de naturaleza exploratoria y se basa en un modelo de regresión Lasso que integra indicadores de alta frecuencia.

    Los principales factores que contribuyen a esta estimación incluyen el ${topFeatures}. Es importante destacar que, si bien estos indicadores proporcionan una visión oportuna de la actividad económica, la estimación final está sujeta a la disponibilidad de datos oficiales y a posibles revisiones. Se recomienda interpretar este nowcast con cautela, ya que representa una instantánea basada en la información disponible hasta la fecha de corte.
  `;

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Executive Explanation (AI-Generated)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-6 rounded-lg border border-border text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
          {explanationText.trim()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExplanationSection;