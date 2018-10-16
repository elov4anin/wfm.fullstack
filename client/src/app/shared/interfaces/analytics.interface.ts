export interface AnalyticsInterface {
  average: number;
  chart: AnalyticsInterfaceChart[];
}
export interface AnalyticsInterfaceChart {
  gain: number;
  order: number;
  label: string;
}
