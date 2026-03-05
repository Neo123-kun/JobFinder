import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Job as JobType } from '../types/job';
import { ApplicationEntry } from '../types/application';
import generateId from '../utils/generateId';

type ApplicantPayload = {
  name: string;
  email: string;
  contact: string;
  reason: string;
};

interface JobContextType {
  savedJobs: JobType[];
  addJob: (job: JobType) => void;
  removeJob: (id: string) => void;
  isSaved: (id: string) => boolean;
  appliedJobs: ApplicationEntry[];
  applyJob: (job: JobType, applicant: ApplicantPayload) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<JobType[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<ApplicationEntry[]>([]);

  const addJob = (job: JobType) => {
    setSavedJobs(prev => {
      const exists = prev.some(j => j.id === job.id);
      if (exists) return prev;
      return [...prev, job];
    });
  };

  const removeJob = (id: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  const isSaved = (id: string) => {
    return savedJobs.some(job => job.id === id);
  };

  const applyJob = (job: JobType, applicant: ApplicantPayload) => {
    setAppliedJobs(prev => {
      const entry: ApplicationEntry = {
        id: generateId(),
        job,
        applicantName: applicant.name,
        applicantEmail: applicant.email,
        applicantContact: applicant.contact,
        reason: applicant.reason,
        appliedAt: new Date().toISOString(),
      };
      return [...prev, entry];
    });
  };

  return (
    <JobContext.Provider value={{ savedJobs, addJob, removeJob, isSaved, appliedJobs, applyJob }}>
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