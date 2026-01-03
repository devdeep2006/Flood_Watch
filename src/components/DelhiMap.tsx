import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WardData {
  id: string;
  name: string;
  risk: 'low' | 'moderate' | 'high' | 'critical';
  floodProbability: number;
  timeToFlood: string;
  x: number;
  y: number;
  size: number;
}

const wards: WardData[] = [
  { id: '1', name: 'Rohini', risk: 'moderate', floodProbability: 45, timeToFlood: '45 min', x: 25, y: 20, size: 12 },
  { id: '2', name: 'Narela', risk: 'low', floodProbability: 15, timeToFlood: '-', x: 35, y: 10, size: 10 },
  { id: '3', name: 'Pitampura', risk: 'high', floodProbability: 72, timeToFlood: '25 min', x: 30, y: 28, size: 11 },
  { id: '4', name: 'Model Town', risk: 'moderate', floodProbability: 55, timeToFlood: '40 min', x: 38, y: 25, size: 9 },
  { id: '5', name: 'Karol Bagh', risk: 'critical', floodProbability: 89, timeToFlood: '15 min', x: 42, y: 45, size: 10 },
  { id: '6', name: 'Rajouri Garden', risk: 'high', floodProbability: 78, timeToFlood: '20 min', x: 30, y: 50, size: 11 },
  { id: '7', name: 'Dwarka', risk: 'low', floodProbability: 22, timeToFlood: '-', x: 15, y: 65, size: 14 },
  { id: '8', name: 'Janakpuri', risk: 'moderate', floodProbability: 48, timeToFlood: '50 min', x: 22, y: 55, size: 10 },
  { id: '9', name: 'Saket', risk: 'high', floodProbability: 68, timeToFlood: '30 min', x: 50, y: 70, size: 9 },
  { id: '10', name: 'Nehru Place', risk: 'critical', floodProbability: 92, timeToFlood: '10 min', x: 58, y: 62, size: 10 },
  { id: '11', name: 'Lajpat Nagar', risk: 'high', floodProbability: 75, timeToFlood: '22 min', x: 55, y: 55, size: 8 },
  { id: '12', name: 'Connaught Place', risk: 'moderate', floodProbability: 52, timeToFlood: '35 min', x: 48, y: 42, size: 10 },
  { id: '13', name: 'Chandni Chowk', risk: 'critical', floodProbability: 95, timeToFlood: '8 min', x: 55, y: 35, size: 9 },
  { id: '14', name: 'Shahdara', risk: 'high', floodProbability: 70, timeToFlood: '28 min', x: 70, y: 35, size: 12 },
  { id: '15', name: 'Mayur Vihar', risk: 'moderate', floodProbability: 42, timeToFlood: '55 min', x: 75, y: 50, size: 11 },
  { id: '16', name: 'Noida Border', risk: 'low', floodProbability: 18, timeToFlood: '-', x: 85, y: 60, size: 10 },
  { id: '17', name: 'East Delhi', risk: 'moderate', floodProbability: 58, timeToFlood: '38 min', x: 78, y: 42, size: 10 },
  { id: '18', name: 'ITO', risk: 'high', floodProbability: 82, timeToFlood: '18 min', x: 60, y: 48, size: 8 },
];

const getRiskColor = (risk: WardData['risk']) => {
  switch (risk) {
    case 'low': return 'bg-success';
    case 'moderate': return 'bg-warning';
    case 'high': return 'bg-destructive/80';
    case 'critical': return 'bg-destructive';
  }
};

const getRiskGlow = (risk: WardData['risk']) => {
  switch (risk) {
    case 'low': return 'shadow-[0_0_15px_hsl(var(--success)/0.5)]';
    case 'moderate': return 'shadow-[0_0_15px_hsl(var(--warning)/0.5)]';
    case 'high': return 'shadow-[0_0_20px_hsl(var(--destructive)/0.5)]';
    case 'critical': return 'shadow-[0_0_25px_hsl(var(--destructive)/0.7)] animate-pulse';
  }
};

const DelhiMap = () => {
  const [selectedWard, setSelectedWard] = useState<WardData | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="glass-card p-6 h-full animate-fade-in" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Delhi Ward Risk Map</h2>
          <p className="text-sm text-muted-foreground">Real-time flood probability visualization</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.2))}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Layers className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
        <span className="text-muted-foreground">Risk Level:</span>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-success" />
          <span className="text-muted-foreground">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-muted-foreground">Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-destructive/80" />
          <span className="text-muted-foreground">High</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          <span className="text-muted-foreground">Critical</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[400px] bg-secondary/30 rounded-xl overflow-hidden map-grid border border-border/50">
        <div 
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Delhi boundary outline */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M 20 15 Q 45 5, 75 20 Q 90 35, 85 60 Q 80 80, 55 85 Q 30 88, 15 70 Q 5 50, 20 15"
              fill="none"
              stroke="hsl(var(--primary) / 0.3)"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          </svg>

          {/* Ward markers */}
          {wards.map((ward) => (
            <button
              key={ward.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-300 ${getRiskColor(ward.risk)} ${getRiskGlow(ward.risk)} hover:scale-125`}
              style={{
                left: `${ward.x}%`,
                top: `${ward.y}%`,
                width: `${ward.size * zoom}px`,
                height: `${ward.size * zoom}px`,
              }}
              onClick={() => setSelectedWard(ward)}
              title={ward.name}
            />
          ))}
        </div>

        {/* Selected Ward Info */}
        {selectedWard && (
          <div className="absolute bottom-4 left-4 right-4 glass-card p-4 animate-slide-in-right">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground">{selectedWard.name}</h3>
                  <Badge variant={selectedWard.risk}>{selectedWard.risk}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Flood Probability</p>
                    <p className="text-lg font-bold text-foreground">{selectedWard.floodProbability}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Est. Time to Flood</p>
                    <p className="text-lg font-bold text-foreground">{selectedWard.timeToFlood}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedWard(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DelhiMap;
