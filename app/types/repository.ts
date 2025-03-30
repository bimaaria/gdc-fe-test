export interface Repository { 
  id: number; 
  name: string; 
  description: string | null; 
  stargazers_count: number; 
  forks: number; 
  language: string | null; 
}
