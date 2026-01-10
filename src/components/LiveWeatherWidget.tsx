import { Cloud, Droplets, Wind, Thermometer, Eye, Gauge, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useWeatherData, WeatherData } from '@/hooks/useWeatherData';
import { Skeleton } from '@/components/ui/skeleton';

const getWeatherIcon = (iconCode: string) => {
  const baseUrl = 'https://openweathermap.org/img/wn/';
  return `${baseUrl}${iconCode}@2x.png`;
};

const getIntensityLevel = (rainfall: number) => {
  if (rainfall >= 60) return { label: 'Extreme', variant: 'critical' as const };
  if (rainfall >= 45) return { label: 'Heavy', variant: 'high' as const };
  if (rainfall >= 30) return { label: 'Moderate', variant: 'moderate' as const };
  if (rainfall > 0) return { label: 'Light', variant: 'low' as const };
  return { label: 'None', variant: 'default' as const };
};

const LiveWeatherWidget = () => {
  const { data: weather, isLoading, error, refetch, isFetching } = useWeatherData();

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-32 w-full mb-6" />
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>
    );
  }

  // Use fallback data if error or no data
  const weatherData: WeatherData = weather || {
    location: 'Delhi',
    temperature: 28,
    humidity: 89,
    windSpeed: 24,
    rainfall: 42,
    description: 'moderate rain',
    icon: '10d',
    pressure: 1008,
    visibility: 5,
    clouds: 75,
    timestamp: new Date().toISOString(),
    forecast: [],
    fallback: true,
  };

  const intensity = getIntensityLevel(weatherData.rainfall);

  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <Cloud className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Live Weather</h2>
            <p className="text-sm text-muted-foreground">
              {weatherData.location} • {weatherData.fallback ? 'Cached' : 'Real-time'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={intensity.variant}>{intensity.label}</Badge>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Current Weather */}
      <div className="text-center mb-6 p-6 rounded-xl bg-secondary/30 border border-border/50">
        <div className="flex items-center justify-center gap-4 mb-2">
          <img 
            src={getWeatherIcon(weatherData.icon)} 
            alt={weatherData.description}
            className="w-16 h-16"
          />
          <div className="text-left">
            <span className="text-4xl font-bold text-foreground">{weatherData.temperature}°C</span>
            <p className="text-sm text-muted-foreground capitalize">{weatherData.description}</p>
          </div>
        </div>
        
        {weatherData.rainfall > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4 p-3 rounded-lg bg-primary/10">
            <Droplets className="w-5 h-5 text-primary" />
            <span className="text-xl font-bold text-foreground">{weatherData.rainfall}</span>
            <span className="text-muted-foreground">mm/hr rainfall</span>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-3 rounded-lg bg-secondary/30 text-center">
          <Wind className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
          <p className="text-lg font-semibold text-foreground">{weatherData.windSpeed}</p>
          <p className="text-[10px] text-muted-foreground">km/h Wind</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30 text-center">
          <Droplets className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
          <p className="text-lg font-semibold text-foreground">{weatherData.humidity}%</p>
          <p className="text-[10px] text-muted-foreground">Humidity</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30 text-center">
          <Gauge className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
          <p className="text-lg font-semibold text-foreground">{weatherData.pressure}</p>
          <p className="text-[10px] text-muted-foreground">hPa Pressure</p>
        </div>
        <div className="p-3 rounded-lg bg-secondary/30 text-center">
          <Eye className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
          <p className="text-lg font-semibold text-foreground">{weatherData.visibility} km</p>
          <p className="text-[10px] text-muted-foreground">Visibility</p>
        </div>
      </div>

      {/* Forecast */}
      {weatherData.forecast && weatherData.forecast.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Upcoming Hours</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {weatherData.forecast.slice(0, 6).map((item, index) => (
              <div 
                key={index}
                className="flex-shrink-0 p-3 rounded-lg bg-secondary/30 text-center min-w-[80px]"
              >
                <p className="text-xs text-muted-foreground mb-1">{item.time}</p>
                <img 
                  src={getWeatherIcon(item.icon)} 
                  alt={item.description}
                  className="w-8 h-8 mx-auto"
                />
                <p className="text-sm font-semibold text-foreground">{item.temperature}°</p>
                {item.rainfall > 0 && (
                  <p className="text-xs text-primary">{item.rainfall}mm</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        Last updated: {new Date(weatherData.timestamp).toLocaleTimeString('en-IN')}
        {weatherData.fallback && ' (using cached data)'}
      </p>
    </div>
  );
};

export default LiveWeatherWidget;
