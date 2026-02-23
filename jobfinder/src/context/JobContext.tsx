import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  salary?: string;
}

interface JobContextType {
  savedJobs: Job[];
  addJob: (job: Job) => void;
  removeJob: (id: string) => void;
  isSaved: (id: string) => boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const addJob = (job: Job) => {
    setSavedJobs(prev => {
      const exists = prev.some(j => j.id === job.id);
      if (exists) return prev; // prevent duplicates
      return [...prev, job];
    });
  };

  const removeJob = (id: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  const isSaved = (id: string) => {
    return savedJobs.some(job => job.id === id);
  };

  return (
    <JobContext.Provider value={{ savedJobs, addJob, removeJob, isSaved }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used inside JobProvider');
  }
  return context;
};