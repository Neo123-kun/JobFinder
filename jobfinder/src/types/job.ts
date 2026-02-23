export interface Job {
  id: string; // we generate this
  title: string;
  company: string;
  location?: string;
  salary?: string;
  description?: string;
}