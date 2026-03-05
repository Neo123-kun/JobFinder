import { Job } from './job';

export interface ApplicationEntry {
  id: string;
  job: Job;
  applicantName: string;
  applicantEmail: string;
  applicantContact: string;
  reason: string;
  appliedAt: string;
}
