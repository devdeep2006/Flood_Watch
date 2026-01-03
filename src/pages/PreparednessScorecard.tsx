import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  ClipboardCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Droplets,
  Wrench,
  Users,
  Shield,
  Download,
  Share2
} from 'lucide-react';

interface ZoneScore {
  zone: string;
  overallScore: number;
  repeatLocations: number;
  incidentTrend: 'improving' | 'stable' | 'worsening';
  drainageReadiness: number;
  responseCapability: number;
  lastUpdated: string;
}

const zoneScores: ZoneScore[] = [
  { zone: 'North Delhi', overallScore: 68, repeatLocations: 12, incidentTrend: 'improving', drainageReadiness: 72, responseCapability: 78, lastUpdated: '2 hours ago' },
  { zone: 'South Delhi', overallScore: 62, repeatLocations: 18, incidentTrend: 'stable', drainageReadiness: 65, responseCapability: 72, lastUpdated: '1 hour ago' },
  { zone: 'East Delhi', overallScore: 55, repeatLocations: 22, incidentTrend: 'stable', drainageReadiness: 58, responseCapability: 65, lastUpdated: '3 hours ago' },
  { zone: 'West Delhi', overallScore: 48, repeatLocations: 28, incidentTrend: 'worsening', drainageReadiness: 45, responseCapability: 58, lastUpdated: '30 min ago' },
  { zone: 'Central Delhi', overallScore: 35, repeatLocations: 35, incidentTrend: 'worsening', drainageReadiness: 32, responseCapability: 48, lastUpdated: '15 min ago' },
  { zone: 'New Delhi', overallScore: 72, repeatLocations: 8, incidentTrend: 'improving', drainageReadiness: 78, responseCapability: 82, lastUpdated: '4 hours ago' },
];

interface PreparednessMetric {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  score: number;
  status: 'good' | 'moderate' | 'poor';
  details: string;
}

const cityMetrics: PreparednessMetric[] = [
  { category: 'Drainage Infrastructure', icon: Droplets, score: 58, status: 'moderate', details: '68% of planned upgrades completed' },
  { category: 'Emergency Response Teams', icon: Users, score: 75, status: 'good', details: '45 teams across 11 zones' },
  { category: 'Equipment Readiness', icon: Wrench, score: 82, status: 'good', details: '156 pumps, 42 boats ready' },
  { category: 'Early Warning Coverage', icon: Shield, score: 91, status: 'good', details: '272/272 wards connected' },
  { category: 'Historical Pattern Analysis', icon: TrendingUp, score: 88, status: 'good', details: '5 year data integrated' },
  { category: 'Citizen App Adoption', icon: Users, score: 45, status: 'poor', details: '180K active users (target: 500K)' },
];

const getScoreColor = (score: number) => {
  if (score >= 70) return 'text-success';
  if (score >= 50) return 'text-warning';
  return 'text-destructive';
};

const getScoreBg = (score: number) => {
  if (score >= 70) return 'bg-success';
  if (score >= 50) return 'bg-warning';
  return 'bg-destructive';
};

const getTrendIcon = (trend: ZoneScore['incidentTrend']) => {
  switch (trend) {
    case 'improving': return <TrendingDown className="w-4 h-4 text-success" />;
    case 'worsening': return <TrendingUp className="w-4 h-4 text-destructive" />;
    case 'stable': return <span className="w-4 h-4 flex items-center justify-center text-warning">−</span>;
  }
};

const PreparednessScorecard = () => {
  const overallScore = Math.round(zoneScores.reduce((acc, z) => acc + z.overallScore, 0) / zoneScores.length);
  const avgMetricScore = Math.round(cityMetrics.reduce((acc, m) => acc + m.score, 0) / cityMetrics.length);

  return (
    <Layout>
      <Helmet>
        <title>Preparedness Scorecard | Delhi FloodWatch</title>
        <meta name="description" content="Monsoon preparedness assessment with zone-wise scores and transparency dashboard." />
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Monsoon Preparedness Scorecard</h1>
            <p className="text-muted-foreground">Real-time assessment for public transparency</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Overall Score Card */}
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-secondary/30 border border-border/50">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-secondary"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${overallScore * 3.52} 352`}
                    className={getScoreColor(overallScore)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</span>
                  <span className="text-sm text-muted-foreground">/ 100</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground">City Preparedness</h3>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Season Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm text-muted-foreground">Monsoon Phase</span>
                  <Badge variant="warning">Active - Peak</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm text-muted-foreground">Days Since Start</span>
                  <span className="font-mono text-foreground">42 days</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm text-muted-foreground">Total Rainfall</span>
                  <span className="font-mono text-foreground">385 mm</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="text-sm text-muted-foreground">Incidents This Season</span>
                  <span className="font-mono text-foreground">156</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-success/20 text-center">
                  <CheckCircle className="w-6 h-6 text-success mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">4</p>
                  <p className="text-xs text-muted-foreground">Zones Ready</p>
                </div>
                <div className="p-3 rounded-lg bg-warning/20 text-center">
                  <AlertTriangle className="w-6 h-6 text-warning mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">1</p>
                  <p className="text-xs text-muted-foreground">Moderate</p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/20 text-center">
                  <XCircle className="w-6 h-6 text-destructive mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">1</p>
                  <p className="text-xs text-muted-foreground">Critical</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/20 text-center">
                  <TrendingDown className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">2</p>
                  <p className="text-xs text-muted-foreground">Improving</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Zone-wise Scores */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Zone-wise Preparedness</h2>
            <div className="space-y-4">
              {zoneScores.sort((a, b) => a.overallScore - b.overallScore).map((zone) => (
                <div key={zone.zone} className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{zone.zone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(zone.incidentTrend)}
                      <span className={`text-2xl font-bold ${getScoreColor(zone.overallScore)}`}>
                        {zone.overallScore}
                      </span>
                    </div>
                  </div>
                  <Progress value={zone.overallScore} className="h-2 mb-3" />
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">Repeat Locations</p>
                      <p className="font-mono text-foreground">{zone.repeatLocations}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Drainage</p>
                      <p className="font-mono text-foreground">{zone.drainageReadiness}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Response</p>
                      <p className="font-mono text-foreground">{zone.responseCapability}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* City-wide Metrics */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">City-wide Metrics</h2>
            <div className="space-y-4">
              {cityMetrics.map((metric) => (
                <div key={metric.category} className="p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      metric.status === 'good' ? 'bg-success/20' : 
                      metric.status === 'moderate' ? 'bg-warning/20' : 'bg-destructive/20'
                    }`}>
                      <metric.icon className={`w-5 h-5 ${
                        metric.status === 'good' ? 'text-success' : 
                        metric.status === 'moderate' ? 'text-warning' : 'text-destructive'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{metric.category}</span>
                        <span className={`font-bold ${getScoreColor(metric.score)}`}>{metric.score}%</span>
                      </div>
                      <Progress value={metric.score} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">{metric.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repeat Flooding Locations */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Repeat Flooding Locations (Top 10)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { location: 'Minto Road Underpass', incidents: 23, zone: 'Central' },
              { location: 'ITO Junction', incidents: 19, zone: 'Central' },
              { location: 'Pul Prahladpur', incidents: 17, zone: 'South' },
              { location: 'Mehrauli-Badarpur Road', incidents: 15, zone: 'South' },
              { location: 'Mayapuri Industrial', incidents: 14, zone: 'West' },
              { location: 'Wazirabad Bridge', incidents: 13, zone: 'North' },
              { location: 'Janakpuri D-Block', incidents: 12, zone: 'West' },
              { location: 'Okhla Phase-2', incidents: 11, zone: 'South' },
              { location: 'Mundka Village', incidents: 10, zone: 'West' },
              { location: 'Rohini Sector-7', incidents: 9, zone: 'North' },
            ].map((loc, index) => (
              <div key={loc.location} className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index < 3 ? 'bg-destructive text-destructive-foreground' : 
                    index < 6 ? 'bg-warning text-warning-foreground' : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-xs text-muted-foreground">{loc.zone}</span>
                </div>
                <p className="text-sm font-medium text-foreground truncate">{loc.location}</p>
                <p className="text-xs text-muted-foreground mt-1">{loc.incidents} incidents/season</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PreparednessScorecard;
