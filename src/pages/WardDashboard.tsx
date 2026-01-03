import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  History, 
  Activity, 
  Droplets, 
  Cloud, 
  AlertTriangle,
  Eye,
  Calendar,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

interface WardData {
  id: string;
  name: string;
  zone: string;
  currentRisk: 'low' | 'moderate' | 'high' | 'critical';
  historicalRisk: 'low' | 'moderate' | 'high' | 'critical';
  currentRainfall: number;
  drainCapacity: number;
  activeIncidents: number;
  historicalIncidents: number;
  lastFlood: string;
  population: string;
}

const wardsData: WardData[] = [
  { id: '1', name: 'Chandni Chowk', zone: 'Central', currentRisk: 'critical', historicalRisk: 'critical', currentRainfall: 52, drainCapacity: 15, activeIncidents: 4, historicalIncidents: 47, lastFlood: '2 hours ago', population: '156K' },
  { id: '2', name: 'Nehru Place', zone: 'South', currentRisk: 'critical', historicalRisk: 'high', currentRainfall: 48, drainCapacity: 22, activeIncidents: 3, historicalIncidents: 38, lastFlood: '4 hours ago', population: '89K' },
  { id: '3', name: 'Karol Bagh', zone: 'Central', currentRisk: 'high', historicalRisk: 'high', currentRainfall: 45, drainCapacity: 28, activeIncidents: 2, historicalIncidents: 42, lastFlood: '6 hours ago', population: '178K' },
  { id: '4', name: 'ITO', zone: 'Central', currentRisk: 'high', historicalRisk: 'moderate', currentRainfall: 42, drainCapacity: 35, activeIncidents: 2, historicalIncidents: 35, lastFlood: '8 hours ago', population: '45K' },
  { id: '5', name: 'Rajouri Garden', zone: 'West', currentRisk: 'high', historicalRisk: 'high', currentRainfall: 44, drainCapacity: 32, activeIncidents: 2, historicalIncidents: 31, lastFlood: '5 hours ago', population: '203K' },
  { id: '6', name: 'Lajpat Nagar', zone: 'South', currentRisk: 'moderate', historicalRisk: 'high', currentRainfall: 38, drainCapacity: 45, activeIncidents: 1, historicalIncidents: 28, lastFlood: '1 day ago', population: '145K' },
  { id: '7', name: 'Pitampura', zone: 'North', currentRisk: 'moderate', historicalRisk: 'moderate', currentRainfall: 35, drainCapacity: 52, activeIncidents: 1, historicalIncidents: 24, lastFlood: '2 days ago', population: '267K' },
  { id: '8', name: 'Shahdara', zone: 'East', currentRisk: 'moderate', historicalRisk: 'high', currentRainfall: 40, drainCapacity: 38, activeIncidents: 1, historicalIncidents: 29, lastFlood: '12 hours ago', population: '312K' },
  { id: '9', name: 'Rohini', zone: 'North', currentRisk: 'low', historicalRisk: 'moderate', currentRainfall: 28, drainCapacity: 68, activeIncidents: 0, historicalIncidents: 18, lastFlood: '5 days ago', population: '445K' },
  { id: '10', name: 'Dwarka', zone: 'South-West', currentRisk: 'low', historicalRisk: 'low', currentRainfall: 22, drainCapacity: 75, activeIncidents: 0, historicalIncidents: 12, lastFlood: '2 weeks ago', population: '389K' },
];

const getRiskColor = (risk: WardData['currentRisk']) => {
  switch (risk) {
    case 'low': return 'bg-success';
    case 'moderate': return 'bg-warning';
    case 'high': return 'bg-destructive/80';
    case 'critical': return 'bg-destructive';
  }
};

const WardDashboard = () => {
  const [view, setView] = useState<'live' | 'historical'>('live');
  const [selectedWard, setSelectedWard] = useState<WardData | null>(null);

  return (
    <Layout>
      <Helmet>
        <title>Ward Risk Dashboard | Delhi FloodWatch</title>
        <meta name="description" content="Interactive ward-level risk visualization with live and historical flood data for all Delhi wards." />
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Interactive Ward-Level Risk Dashboard</h1>
            <p className="text-muted-foreground">Color-coded heat map with dual view modes</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={view === 'live' ? 'default' : 'outline'} 
              onClick={() => setView('live')}
              className="gap-2"
            >
              <Activity className="w-4 h-4" />
              Live View
            </Button>
            <Button 
              variant={view === 'historical' ? 'default' : 'outline'} 
              onClick={() => setView('historical')}
              className="gap-2"
            >
              <History className="w-4 h-4" />
              Historical
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="glass-card p-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-sm text-muted-foreground">Risk Level:</span>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-success" />
              <span className="text-sm text-foreground">Low (0-25%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-warning" />
              <span className="text-sm text-foreground">Moderate (26-50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-destructive/80" />
              <span className="text-sm text-foreground">High (51-75%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-destructive animate-pulse" />
              <span className="text-sm text-foreground">Critical (76-100%)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Heat Map Grid */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                {view === 'live' ? 'Live Risk Heat Map' : 'Historical Risk Pattern'}
              </h2>
              <Badge variant={view === 'live' ? 'default' : 'secondary'}>
                {view === 'live' ? 'Real-time' : 'Last 5 Years'}
              </Badge>
            </div>

            {/* Ward Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {wardsData.map((ward) => {
                const risk = view === 'live' ? ward.currentRisk : ward.historicalRisk;
                const isSelected = selectedWard?.id === ward.id;
                
                return (
                  <button
                    key={ward.id}
                    onClick={() => setSelectedWard(ward)}
                    className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${getRiskColor(risk)} ${
                      isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                    }`}
                  >
                    <div className="text-center">
                      <p className="font-semibold text-sm text-white truncate">{ward.name}</p>
                      <p className="text-xs text-white/80 mt-1">{ward.zone}</p>
                      {view === 'live' && ward.activeIncidents > 0 && (
                        <div className="mt-2 flex items-center justify-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-white" />
                          <span className="text-xs text-white">{ward.activeIncidents} active</span>
                        </div>
                      )}
                      {view === 'historical' && (
                        <p className="text-xs text-white/80 mt-2">{ward.historicalIncidents} incidents</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ward Details Panel */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Ward Details</h2>
            
            {selectedWard ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{selectedWard.name}</h3>
                    <Badge variant={view === 'live' ? 
                      (selectedWard.currentRisk === 'critical' ? 'critical' : selectedWard.currentRisk) : 
                      (selectedWard.historicalRisk === 'critical' ? 'critical' : selectedWard.historicalRisk)
                    }>
                      {view === 'live' ? selectedWard.currentRisk : selectedWard.historicalRisk}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedWard.zone} Delhi • Pop. {selectedWard.population}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                    <div className="flex items-center gap-2">
                      <Cloud className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Current Rainfall</span>
                    </div>
                    <span className="font-mono text-foreground">{selectedWard.currentRainfall} mm/hr</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Drain Capacity</span>
                    </div>
                    <span className="font-mono text-foreground">{selectedWard.drainCapacity}%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="text-sm text-muted-foreground">Active Incidents</span>
                    </div>
                    <span className="font-mono text-foreground">{selectedWard.activeIncidents}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                    <div className="flex items-center gap-2">
                      <History className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Historical Incidents</span>
                    </div>
                    <span className="font-mono text-foreground">{selectedWard.historicalIncidents}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Last Flood</span>
                    </div>
                    <span className="text-sm text-foreground">{selectedWard.lastFlood}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full gap-2">
                  <Eye className="w-4 h-4" />
                  View Full Report
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select a ward to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {wardsData.filter(w => w.currentRisk === 'critical').length}
                </p>
                <p className="text-xs text-muted-foreground">Critical Wards</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {wardsData.filter(w => w.currentRisk === 'high').length}
                </p>
                <p className="text-xs text-muted-foreground">High Risk Wards</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {wardsData.reduce((acc, w) => acc + w.activeIncidents, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Active Incidents</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <Droplets className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(wardsData.reduce((acc, w) => acc + w.drainCapacity, 0) / wardsData.length)}%
                </p>
                <p className="text-xs text-muted-foreground">Avg Drain Capacity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WardDashboard;
