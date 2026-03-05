import { Job } from '../types/job';

export type RootStackParamList = {
  JobFinder: undefined;
  JobDetails: { job: Job };
  ApplicationForm: { 
    jobId: string; 
    jobData?: Job;
    fromSaved?: boolean 
  };
  HomeTabs: undefined;
};