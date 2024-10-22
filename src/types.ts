export interface Job {
  id: number;
  name: string;
  lastRun: string;
  status: 'warning' | 'success' | 'failed';
  history: {
    status: 'success' | 'warning' | 'failed';
    message: string;
    timestamp: string;
  }[];
}