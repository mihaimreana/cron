import React from 'react';
import JobItem from './JobItem';
import { Job } from '../types';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="grid grid-cols-5 gap-4 p-4 bg-gray-200 font-semibold">
        <div>Job Name</div>
        <div>Last Run</div>
        <div>Status</div>
        <div>Last Message</div>
        <div>History (Last 5 Runs)</div>
      </div>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;