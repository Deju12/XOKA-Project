import { Candidate } from "./candidate.model";




export interface Employee {
  id: number;
  name: string;
  organizationId: number;
  departmentId: number;
  salary:number; 
  candidateId: number; 
  candidate?:Candidate;  
}