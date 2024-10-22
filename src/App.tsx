import React, { useState, useEffect } from 'react';
import JobList from './components/JobList';
import { Job } from './types';

const generateRandomMessage = (status: string) => {
  const messages = {
    success: [
      "Job completed successfully",
      "All tasks executed without errors",
      "Process finished with optimal results",
    ],
    warning: [
      "Job completed with minor issues",
      "Some tasks encountered non-critical errors",
      "Process finished with suboptimal performance",
    ],
    failed: [
      "Job failed to complete",
      "Critical error encountered during execution",
      "Process terminated unexpectedly",
    ],
  };
  return messages[status as keyof typeof messages][Math.floor(Math.random() * 3)];
};

const generateRandomHistory = () => {
  return Array(5).fill(null).map(() => {
    const rand = Math.random();
    const status = rand > 0.7 ? 'success' : rand > 0.3 ? 'warning' : 'failed';
    return { 
      status, 
      message: generateRandomMessage(status), 
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
    };
  });
};

const initialJobs: Job[] = [
  { id: 1, name: 'eCW restore', lastRun: new Date().toISOString(), status: 'warning', history: generateRandomHistory() },
  { id: 2, name: 'CrossTalk', lastRun: new Date().toISOString(), status: 'success', history: generateRandomHistory() },
  { id: 3, name: 'Group Sync', lastRun: new Date().toISOString(), status: 'failed', history: generateRandomHistory() },
];

function App() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  useEffect(() => {
    const interval = setInterval(() => {
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          const newStatus = Math.random() > 0.7 ? 'success' : Math.random() > 0.3 ? 'warning' : 'failed';
          const newTimestamp = new Date().toISOString();
          return {
            ...job,
            lastRun: newTimestamp,
            status: newStatus,
            history: [{ status: newStatus, message: generateRandomMessage(newStatus), timestamp: newTimestamp }, ...job.history.slice(0, 4)],
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Cron Job Status Dashboard</h1>
          <p className="text-gray-600">Monitor your cron jobs in real-time</p>
        </header>
        <JobList jobs={jobs} />
      </div>
    </div>
  );
}

export default App;