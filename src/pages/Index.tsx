"use client";

import MainLayout from "@/components/layout/MainLayout";
import OverviewSection from "@/components/OverviewSection";
import ModelSection from "@/components/ModelSection";
import ExplanationSection from "@/components/ExplanationSection";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-12">
        <OverviewSection />
        <ModelSection />
        <ExplanationSection />
      </div>
    </MainLayout>
  );
};

export default Index;