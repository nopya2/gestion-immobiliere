import { Employee } from "./employee.type";
import { User } from "./user.type";

export interface Manager{
    '@id'?: string;
    id?: string;
    employee: Employee
}