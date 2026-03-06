import axios from 'axios';
import { Job } from '../types/job';

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

const API_URL = 'https://empllo.com/api/v1';

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get(API_URL);

    const jobs = response.data.jobs;

    if (!Array.isArray(jobs)) {
      return [];
    }

    const jobsWithId: Job[] = jobs.map((job: any, index: number) => ({
      id: hashString(
        (job.title ?? '') +
        (job.companyName ?? '') +
        (job.description ?? '').slice(0, 100) +
        index
      ),
      title: job.title ?? 'No Title',
      company: job.companyName
        ? JSON.parse(`"${job.companyName}"`)
        : 'Unknown Company',
      locations: job.locations ?? undefined,
      maxSalary: job.maxSalary ?? 'Undefined',
      minSalary: job.minSalary ?? undefined,
      currency: job.currency ?? undefined,
      description: job.description ?? '',
    }));

    return jobsWithId;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};