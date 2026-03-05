import axios from 'axios';
import uuid from 'react-native-uuid';
import { Job } from '../types/job';

const API_URL = 'https://empllo.com/api/v1';

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get(API_URL);

    const jobs = response.data.jobs;

    if (!Array.isArray(jobs)) {
      return [];
    }

    const jobsWithId: Job[] = jobs.map((job: any) => ({
      id: uuid.v4().toString(),
      title: job.title ?? 'No Title',
      company: job.companyName ?? 'Unknown Company',
      locations: job.locations ?? undefined,
      maxSalary: job.maxSalary ?? undefined,
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
