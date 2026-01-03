import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Droplets, 
  Activity, 
  AlertTriangle, 
  TrendingUp,
  TrendingDown,
  Gauge,
  Wrench,
  MapPin,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface WardDrainage {
  id: string;
  name: string;
  zone: string;
  healthScore: number;
  designedCapacity: number;
  actualLoad: number;
  drainDensity: number;
  majorOutlets: number;
  connectedOutlets: number;
  historicalPerformance: 'excellent' | 'good' | 'average' | 'poor' | 'critical';
  trend: 'improving' | 'stable' | 'declining';
  bottlenecks: number;
  maintenanceNeeded: boolean;
}

const drainageData: WardDrainage[] = [
  { id: '1', name: 'Chandni Chowk', zone: 'Central', healthScore: 28, designedCapacity: 1200, actualLoad: 1800, drainDensity: 2.1, majorOutlets: 4, connectedOutlets: 2, historicalPerformance: 'critical', trend: 'declining', bottlenecks: 8, maintenanceNeeded: true },
  { id: '2', name: 'Nehru Place', zone: 'South', healthScore: 35, designedCapacity: 1500, actualLoad: 1950, drainDensity: 2.8, majorOutlets: 5, connectedOutlets: 3, historicalPerformance: 'poor', trend: 'stable', bottlenecks: 6, maintenanceNeeded: true },
  { id: '3', name: 'Karol Bagh', zone: 'Central', healthScore: 42, designedCapacity: 1400, actualLoad: 1680, drainDensity: 3.2, majorOutlets: 6, connectedOutlets: 4, historicalPerformance: 'poor', trend: 'stable', bottlenecks: 5, maintenanceNeeded: true },
  { id: '4', name: 'ITO', zone: 'Central', healthScore: 48, designedCapacity: 1100, actualLoad: 1210, drainDensity: 3.5, majorOutlets: 4, connectedOutlets: 3, historicalPerformance: 'average', trend: 'improving', bottlenecks: 4, maintenanceNeeded: false },
  { id: '5', name: 'Rajouri Garden', zone: 'West', healthScore: 52, designedCapacity: 1600, actualLoad: 1520, drainDensity: 3.8, majorOutlets: 7, connectedOutlets: 5, historicalPerformance: 'average', trend: 'stable', bottlenecks: 3, maintenanceNeeded: false },
  { id: '6', name: 'Lajpat Nagar', zone: 'South', healthScore: 58, designedCapacity: 1300, actualLoad: 1105, drainDensity: 4.1, majorOutlets: 5, connectedOutlets: 4, historicalPerformance: 'good', trend: 'improving', bottlenecks: 2, maintenanceNeeded: false },
  { id: '7', name: 'Dwarka', zone: 'South-West', healthScore: 78, designedCapacity: 2000, actualLoad: 1200, drainDensity: 5.2, majorOutlets: 10, connectedOutlets: 9, historicalPerformance: 'excellent', trend: 'stable', bottlenecks: 1, maintenanceNeeded: false },
  { id: '8', name: 'Rohini', zone: 'North', healthScore: 72, designedCapacity: 1800, actualLoad: 1260, drainDensity: 4.8, majorOutlets: 8, connectedOutlets: 7, historicalPerformance: 'good', trend: 'stable', bottlenecks: 2, maintenanceNeeded: false },
];

const getHealthColor = (score: number) => {
  if (score >= 70) return 'bg-success';
  if (score >= 50) return 'bg-warning';
  if (score >= 30) return 'bg-destructive/80';
  return 'bg-destructive';
};

const getPerformanceVariant = (perf: WardDrainage['historicalPerformance']) => {
  switch (perf) {
    case 'excellent': return 'success';
    case 'good': return 'success';
    case 'average': return 'warning';
    case 'poor': return 'high';
    case 'critical': return 'critical';
  }
};

const getTrendIcon = (trend: WardDrainage['trend']) => {
  switch (trend) {
    case 'improving': return <ArrowUp className="w-4 h-4 text-success" />;
    case 'declining': return <ArrowDown className="w-4 h-4 text-destructive" />;
    case 'stable': return <Minus className="w-4 h-4 text-muted-foreground" />;
  }
};

const DrainageAnalytics = () => {
  const avgHealthScore = Math.round(drainageData.reduce((acc, d) => acc + d.healthScore, 0) / drainageData.length);
  const criticalWards = drainageData.filter(d => d.healthScore < 40).length;
  const totalBottlenecks = drainageData.reduce((acc, d) => acc + d.bottlenecks, 0);
  const maintenanceRequired = drainageData.filter(d => d.maintenanceNeeded).length;

  return (
    <Layout>
      <Helmet>
        <title>Drainage Analytics | Delhi FloodWatch</title>
        <meta name="description" content="Ward-wise drainage infrastructure health analysis and bottleneck identification." />
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Drainage Infrastructure Analytics</h1>
            <p className="text-muted-foreground">Ward-wise health scores and bottleneck analysis</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Wrench className="w-4 h-4" />
            Maintenance Schedule
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${avgHealthScore >= 50 ? 'bg-success/20' : 'bg-warning/20'}`}>
                <Gauge className={`w-5 h-5 ${avgHealthScore >= 50 ? 'text-success' : 'text-warning'}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{avgHealthScore}%</p>
                <p className="text-xs text-muted-foreground">Avg Health Score</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{criticalWards}</p>
                <p className="text-xs text-muted-foreground">Critical Wards</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Activity className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalBottlenecks}</p>
                <p className="text-xs text-muted-foreground">Total Bottlenecks</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{maintenanceRequired}</p>
                <p className="text-xs text-muted-foreground">Need Maintenance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Analytics Table */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Ward-wise Drainage Health</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Ward</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Health Score</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground hidden md:table-cell">Capacity vs Load</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground hidden lg:table-cell">Drain Density</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground hidden lg:table-cell">Outlets</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Performance</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Trend</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground hidden md:table-cell">Issues</th>
                </tr>
              </thead>
              <tbody>
                {drainageData.sort((a, b) => a.healthScore - b.healthScore).map((ward) => (
                  <tr key={ward.id} className="border-b border-border/30 hover:bg-secondary/20 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{ward.name}</p>
                          <p className="text-xs text-muted-foreground">{ward.zone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-mono text-foreground">{ward.healthScore}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-secondary overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${getHealthColor(ward.healthScore)}`}
                              style={{ width: `${ward.healthScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <div className="text-sm">
                        <p className="text-foreground">{ward.actualLoad} / {ward.designedCapacity} L/s</p>
                        <p className={`text-xs ${ward.actualLoad > ward.designedCapacity ? 'text-destructive' : 'text-success'}`}>
                          {Math.round((ward.actualLoad / ward.designedCapacity) * 100)}% utilized
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-2 hidden lg:table-cell">
                      <span className="font-mono text-foreground">{ward.drainDensity} km/km²</span>
                    </td>
                    <td className="py-3 px-2 hidden lg:table-cell">
                      <span className="font-mono text-foreground">{ward.connectedOutlets}/{ward.majorOutlets}</span>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant={getPerformanceVariant(ward.historicalPerformance)}>
                        {ward.historicalPerformance}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      {getTrendIcon(ward.trend)}
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{ward.bottlenecks} bottlenecks</span>
                        {ward.maintenanceNeeded && (
                          <Wrench className="w-4 h-4 text-warning" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Infrastructure Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Critical Infrastructure Gaps</h2>
            <div className="space-y-3">
              {drainageData
                .filter(d => d.healthScore < 50)
                .map((ward) => (
                  <div key={ward.id} className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground">{ward.name}</h3>
                      <Badge variant="critical">{ward.healthScore}%</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {ward.actualLoad > ward.designedCapacity && (
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-destructive" />
                          Capacity exceeded by {Math.round(((ward.actualLoad - ward.designedCapacity) / ward.designedCapacity) * 100)}%
                        </li>
                      )}
                      {ward.connectedOutlets < ward.majorOutlets * 0.7 && (
                        <li className="flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3 text-destructive" />
                          Only {ward.connectedOutlets}/{ward.majorOutlets} outlets connected
                        </li>
                      )}
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-warning" />
                        {ward.bottlenecks} bottleneck locations identified
                      </li>
                    </ul>
                  </div>
                ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Improvement Recommendations</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                <h3 className="font-medium text-foreground mb-2">Priority 1: Chandni Chowk</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Install 2 additional pump stations</li>
                  <li>• Connect remaining 2 major outlets</li>
                  <li>• Clear 8 identified bottlenecks</li>
                  <li>• Upgrade drain capacity by 50%</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                <h3 className="font-medium text-foreground mb-2">Priority 2: Nehru Place</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Replace aging drainage pipes</li>
                  <li>• Add 2 overflow channels</li>
                  <li>• Install real-time sensors</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                <h3 className="font-medium text-foreground mb-2">Priority 3: Karol Bagh</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Desilt main drainage channels</li>
                  <li>• Repair 5 damaged manholes</li>
                  <li>• Connect to Najafgarh drain</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DrainageAnalytics;
