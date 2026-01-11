import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";

import Index from "./pages/Index";
import CrowdsourcedMap from "./pages/CrowdsourcedMap";
import WardDashboard from "./pages/WardDashboard";
import DataAggregation from "./pages/DataAggregation";
import DrainageAnalytics from "./pages/DrainageAnalytics";
import PreparednessScorecard from "./pages/PreparednessScorecard";
import NotFound from "./pages/NotFound";

// 🔥 LAZY IMPORT FOR LANDING PAGE (CRITICAL FIX)
const HeroSection = lazy(() => import("./pages/landing"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              {/* Landing page */}
              <Route path="/" element={<HeroSection />} />

              {/* Dashboard & others */}
              <Route path="/dashboard" element={<Index />} />
              <Route path="/crowdsourced-map" element={<CrowdsourcedMap />} />
              <Route path="/ward-dashboard" element={<WardDashboard />} />
              <Route path="/data-aggregation" element={<DataAggregation />} />
              <Route path="/drainage-analytics" element={<DrainageAnalytics />} />
              <Route path="/preparedness" element={<PreparednessScorecard />} />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
