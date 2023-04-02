import { User } from "./user.type";

export interface Customer {
  "@id"?: string;
  id?: 0;
  numFolder?: string;
  name: string;
  firstname: string;
  contact: string;
  address: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User | string
}