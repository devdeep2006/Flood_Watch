import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  MapPin, 
  Upload, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Image as ImageIcon,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Plus,
  Loader2,
  Eye,
  Droplets
} from 'lucide-react';

interface Report {
  id: string;
  location: string;
  ward: string;
  timestamp: string;
  waterDepth: string;
  confidence: number;
  status: 'verified' | 'pending' | 'flagged';
  upvotes: number;
  downvotes: number;
  imageUrl: string;
  reporter: string;
  mlDetection: {
    waterDetected: boolean;
    estimatedDepth: string;
    severity: 'low' | 'moderate' | 'high' | 'critical';
  };
}

const reports: Report[] = [
  {
    id: '1',
    location: 'Minto Road Underpass',
    ward: 'Connaught Place',
    timestamp: '5 min ago',
    waterDepth: '2.5 ft',
    confidence: 94,
    status: 'verified',
    upvotes: 28,
    downvotes: 2,
    imageUrl: '/placeholder.svg',
    reporter: 'Citizen_Delhi_042',
    mlDetection: { waterDetected: true, estimatedDepth: '2.3-2.7 ft', severity: 'high' },
  },
  {
    id: '2',
    location: 'ITO Junction',
    ward: 'ITO',
    timestamp: '12 min ago',
    waterDepth: '1.8 ft',
    confidence: 87,
    status: 'verified',
    upvotes: 15,
    downvotes: 1,
    imageUrl: '/placeholder.svg',
    reporter: 'FloodWatch_Vol_18',
    mlDetection: { waterDetected: true, estimatedDepth: '1.5-2.0 ft', severity: 'moderate' },
  },
  {
    id: '3',
    location: 'Lajpat Nagar Market',
    ward: 'Lajpat Nagar',
    timestamp: '18 min ago',
    waterDepth: '3.2 ft',
    confidence: 91,
    status: 'pending',
    upvotes: 8,
    downvotes: 0,
    imageUrl: '/placeholder.svg',
    reporter: 'Citizen_Delhi_089',
    mlDetection: { waterDetected: true, estimatedDepth: '3.0-3.5 ft', severity: 'critical' },
  },
  {
    id: '4',
    location: 'Rajouri Garden Metro',
    ward: 'Rajouri Garden',
    timestamp: '25 min ago',
    waterDepth: '1.2 ft',
    confidence: 78,
    status: 'flagged',
    upvotes: 3,
    downvotes: 5,
    imageUrl: '/placeholder.svg',
    reporter: 'Anonymous_User',
    mlDetection: { waterDetected: true, estimatedDepth: '0.8-1.5 ft', severity: 'low' },
  },
  {
    id: '5',
    location: 'Nehru Place Flyover',
    ward: 'Nehru Place',
    timestamp: '32 min ago',
    waterDepth: '2.8 ft',
    confidence: 96,
    status: 'verified',
    upvotes: 42,
    downvotes: 1,
    imageUrl: '/placeholder.svg',
    reporter: 'MCD_Field_Agent',
    mlDetection: { waterDetected: true, estimatedDepth: '2.6-3.0 ft', severity: 'high' },
  },
];

const getStatusStyles = (status: Report['status']) => {
  switch (status) {
    case 'verified':
      return { icon: CheckCircle, color: 'text-success', bg: 'bg-success/20', label: 'Verified' };
    case 'pending':
      return { icon: Clock, color: 'text-warning', bg: 'bg-warning/20', label: 'Pending' };
    case 'flagged':
      return { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/20', label: 'Flagged' };
  }
};

const getSeverityVariant = (severity: Report['mlDetection']['severity']) => {
  switch (severity) {
    case 'low': return 'low';
    case 'moderate': return 'moderate';
    case 'high': return 'high';
    case 'critical': return 'critical';
  }
};

const CrowdsourcedMap = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending'>('all');

  const filteredReports = reports.filter(r => filter === 'all' || r.status === filter);

  return (
    <Layout>
      <Helmet>
        <title>Crowdsourced Flood Map | Delhi FloodWatch</title>
        <meta name="description" content="Real-time citizen-reported flood incidents with AI-powered water detection and depth estimation." />
      </Helmet>

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI-Powered Crowdsourced Flood Map</h1>
            <p className="text-muted-foreground">Real-time citizen reports with ML water detection</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="glow" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Report Flood
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-xs text-muted-foreground">Reports Today</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/20">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">89%</p>
                <p className="text-xs text-muted-foreground">Verification Rate</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/20">
                <Loader2 className="w-5 h-5 text-warning animate-spin" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/20">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Active Hotspots</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map View */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Live Flood Reports Map</h2>
              <div className="flex items-center gap-2">
                <Button 
                  variant={filter === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button 
                  variant={filter === 'verified' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilter('verified')}
                >
                  Verified
                </Button>
                <Button 
                  variant={filter === 'pending' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </Button>
              </div>
            </div>

            {/* Simulated Map */}
            <div className="relative h-[400px] bg-secondary/30 rounded-xl overflow-hidden map-grid border border-border/50">
              {/* Map markers for reports */}
              {filteredReports.map((report, index) => {
                const positions = [
                  { x: 45, y: 35 },
                  { x: 60, y: 48 },
                  { x: 35, y: 55 },
                  { x: 25, y: 42 },
                  { x: 55, y: 62 },
                ];
                const pos = positions[index % positions.length];
                const statusStyles = getStatusStyles(report.status);
                
                return (
                  <button
                    key={report.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full ${statusStyles.bg} border-2 border-current ${statusStyles.color} hover:scale-125 transition-transform cursor-pointer`}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    onClick={() => setSelectedReport(report)}
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                );
              })}

              {/* Selected Report Popup */}
              {selectedReport && (
                <div className="absolute bottom-4 left-4 right-4 glass-card p-4 animate-slide-in-right">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{selectedReport.location}</h3>
                        <Badge variant={getSeverityVariant(selectedReport.mlDetection.severity)}>
                          {selectedReport.mlDetection.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{selectedReport.ward} • {selectedReport.timestamp}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">ML Depth:</span>
                          <span className="text-foreground ml-1 font-mono">{selectedReport.mlDetection.estimatedDepth}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Confidence:</span>
                          <span className="text-foreground ml-1 font-mono">{selectedReport.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedReport(null)} className="text-muted-foreground hover:text-foreground">×</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reports List */}
          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recent Reports</h2>
            <div className="space-y-3 max-h-[450px] overflow-y-auto scrollbar-thin pr-2">
              {filteredReports.map((report) => {
                const statusStyles = getStatusStyles(report.status);
                const StatusIcon = statusStyles.icon;
                
                return (
                  <div 
                    key={report.id}
                    className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all cursor-pointer"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                        <Droplets className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground text-sm truncate">{report.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{report.ward}</span>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{report.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={getSeverityVariant(report.mlDetection.severity)} className="text-[10px]">
                              {report.waterDepth}
                            </Badge>
                            <span className={`flex items-center gap-1 text-xs ${statusStyles.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusStyles.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {report.upvotes}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsDown className="w-3 h-3" />
                              {report.downvotes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CrowdsourcedMap;
