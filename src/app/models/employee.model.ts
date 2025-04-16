import { Candidate } from "./candidate.model";
import { Salary } from "./salaryes.model";


export interface Employee {
  id: number;
  name: string;
  organizationId: number;
  departmentId: number;
  salary?: Salary[]; // Optional property for associated salaries
  candidates?: Candidate[]; // Optional property for associated candidates
}