import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import StatusOverview from '@/components/StatusOverview';
import DelhiMap from '@/components/DelhiMap';
import PredictionPanel from '@/components/PredictionPanel';
import AlertSystem from '@/components/AlertSystem';
import RainfallMonitor from '@/components/RainfallMonitor';
import HighRiskZones from '@/components/HighRiskZones';
import DrainageMetrics from '@/components/DrainageMetrics';

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>Delhi FloodWatch - Predictive Waterlogging Intelligence System</title>
        <meta name="description" content="Real-time flood prediction and early warning system for Delhi. Monitor waterlogging hotspots, rainfall intensity, and drainage infrastructure with AI-powered 30-60 minute forecasts." />
        <meta name="keywords" content="Delhi flood warning, waterlogging prediction, monsoon preparedness, urban flooding, GIS mapping, early warning system" />
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Status Overview */}
        <StatusOverview />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map - Takes 2 columns */}
          <div className="lg:col-span-2">
            <DelhiMap />
          </div>

          {/* Prediction Panel */}
          <div>
            <PredictionPanel />
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alert System */}
          <AlertSystem />

          {/* Rainfall Monitor */}
          <RainfallMonitor />
        </div>

        {/* Priority Response & Drainage */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HighRiskZones />
          </div>
          <div>
            <DrainageMetrics />
          </div>
        </div>

        {/* Footer */}
        <footer className="glass-card p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Delhi FloodWatch © 2024 | Data sources: IMD, Delhi Jal Board, MCD | 
            <span className="text-primary ml-2">System refresh: Every 5 minutes</span>
          </p>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
