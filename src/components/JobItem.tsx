import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Job } from '../types';

interface JobItemProps {
  job: Job;
}

const JobItem: React.FC<JobItemProps> = ({ job }) => {
  const [hoveredHistoryItem, setHoveredHistoryItem] = useState<{message: string, timestamp: string, index: number} | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const getStatusIcon = (status: string, size: number = 20) => {
    const iconProps = { size };
    switch (status) {
      case 'success':
        return <CheckCircle {...iconProps} className="text-green-500" />;
      case 'failed':
        return <XCircle {...iconProps} className="text-red-500" />;
      default:
        return <AlertTriangle {...iconProps} className="text-orange-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getHistoryIcon = (status: string, message: string, timestamp: string, index: number) => {
    return (
      <span
        key={index}
        onMouseEnter={() => setHoveredHistoryItem({ message, timestamp, index })}
        onMouseLeave={() => setHoveredHistoryItem(null)}
        className="mx-1 cursor-pointer"
      >
        {getStatusIcon(status, 16)}
      </span>
    );
  };

  useEffect(() => {
    if (hoveredHistoryItem && tooltipRef.current) {
      const iconElement = tooltipRef.current.parentElement?.children[hoveredHistoryItem.index];
      if (iconElement) {
        const rect = iconElement.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        tooltipRef.current.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
        tooltipRef.current.style.top = `${rect.bottom + 5}px`;
      }
    }
  }, [hoveredHistoryItem]);

  return (
    <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 items-center relative">
      <div className="font-semibold">{job.name}</div>
      <div className="text-sm text-gray-600">{formatDate(job.lastRun)}</div>
      <div className="flex items-center">
        {getStatusIcon(job.status)}
        <span className="ml-2 capitalize">{job.status}</span>
      </div>
      <div className="text-sm text-gray-600 truncate" title={job.history[0].message}>
        {job.history[0].message}
      </div>
      <div className="flex items-center">
        {job.history.map((item, index) => getHistoryIcon(item.status, item.message, item.timestamp, index))}
      </div>
      {hoveredHistoryItem && (
        <div 
          ref={tooltipRef}
          className="fixed bg-white border border-gray-200 shadow-md rounded p-2 z-10 text-xs text-gray-600"
        >
          <p>{formatDate(hoveredHistoryItem.timestamp)}</p>
          <p>{hoveredHistoryItem.message}</p>
        </div>
      )}
    </div>
  );
};

export default JobItem;