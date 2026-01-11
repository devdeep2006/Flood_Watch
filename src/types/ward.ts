// src/types/ward.ts
export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface WardData {
  id: string;
  name: string;
  zone: string;
  population: string;
  
  // Live View Data
  currentRisk: RiskLevel;
  currentRainfall: number;
  drainCapacity: number;
  activeIncidents: number;
  lastFlood: string;
  
  // Historical View Data
  historicalRisk: RiskLevel;
  historicalIncidents: number; // Keep for backward compatibility if needed
  floodFrequency: number;      // New: Total events
  severeFloods: number;        // New: Major disruptions
  peakRainfall: string;        // New: e.g. "162 mm (Aug 2023)"
  avgDrainCapacity: number;    // New: Historical average
}