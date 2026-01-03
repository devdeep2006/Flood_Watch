import { Cloud, Droplets, AlertTriangle, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const StatusOverview = () => {
  const stats = [
    {
      label: 'Active Alerts',
      value: '7',
      icon: AlertTriangle,
      change: '+2 in last hour',
      status: 'warning' as const,
      bgClass: 'bg-warning/10',
      iconClass: 'text-warning',
    },
    {
      label: 'Current Rainfall',
      value: '42mm/hr',
      icon: Cloud,
      change: 'Heavy intensity',
      status: 'high' as const,
      bgClass: 'bg-destructive/10',
      iconClass: 'text-destructive',
    },
    {
      label: 'High Risk Zones',
      value: '12',
      icon: MapPin,
      change: 'Out of 272 wards',
      status: 'moderate' as const,
      bgClass: 'bg-warning/10',
      iconClass: 'text-warning',
    },
    {
      label: 'Drain Capacity',
      value: '68%',
      icon: Droplets,
      change: 'Moderate load',
      status: 'low' as const,
      bgClass: 'bg-success/10',
      iconClass: 'text-success',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="glass-card-hover p-5 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bgClass}`}>
              <stat.icon className={`w-5 h-5 ${stat.iconClass}`} />
            </div>
            <Badge variant={stat.status}>{stat.status}</Badge>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3" />
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusOverview;
