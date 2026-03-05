export interface Job {
  id: string; 
  title: string;
  company: string;
  locations?: string | string[];
  salary?: string;
  minSalary?: number;
  maxSalary?: number;
  currency?: string;
  description?: string;
}