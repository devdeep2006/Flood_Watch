import { TrendingUp, Clock, Gauge, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Prediction {
  ward: string;
  probability: number;
  timeframe: string;
  confidence: number;
  trend: 'rising' | 'stable' | 'falling';
}

const predictions: Prediction[] = [
  { ward: 'Chandni Chowk', probability: 95, timeframe: '8 min', confidence: 92, trend: 'rising' },
  { ward: 'Nehru Place', probability: 92, timeframe: '10 min', confidence: 88, trend: 'rising' },
  { ward: 'Karol Bagh', probability: 89, timeframe: '15 min', confidence: 85, trend: 'stable' },
  { ward: 'ITO', probability: 82, timeframe: '18 min', confidence: 90, trend: 'rising' },
  { ward: 'Rajouri Garden', probability: 78, timeframe: '20 min', confidence: 87, trend: 'stable' },
];

const getTrendIcon = (trend: Prediction['trend']) => {
  switch (trend) {
    case 'rising':
      return <TrendingUp className="w-4 h-4 text-destructive" />;
    case 'falling':
      return <TrendingUp className="w-4 h-4 text-success rotate-180" />;
    case 'stable':
      return <span className="w-4 h-4 flex items-center justify-center text-warning">−</span>;
  }
};

const getRiskVariant = (probability: number) => {
  if (probability >= 80) return 'critical';
  if (probability >= 60) return 'high';
  if (probability >= 40) return 'moderate';
  return 'low';
};

const PredictionPanel = () => {
  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">ML Flood Predictions</h2>
            <p className="text-sm text-muted-foreground">30-60 min forecast window</p>
          </div>
        </div>
        <Badge variant="default" className="gap-1">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          Live
        </Badge>
      </div>

      <div className="space-y-4">
        {predictions.map((pred, index) => (
          <div 
            key={pred.ward} 
            className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
            style={{ animationDelay: `${(index + 4) * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{pred.ward}</span>
                <Badge variant={getRiskVariant(pred.probability)}>
                  {pred.probability}%
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(pred.trend)}
                <span className="text-sm text-muted-foreground font-mono">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {pred.timeframe}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Flood Probability</span>
                <span>{pred.probability}%</span>
              </div>
              <Progress 
                value={pred.probability} 
                className="h-2"
              />
            </div>

            <div className="flex items-center justify-between mt-3 text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Gauge className="w-3 h-3" />
                <span>Model Confidence: {pred.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionPanel;
