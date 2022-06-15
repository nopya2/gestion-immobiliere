import { Etablishment } from "./etablishment.type";
import { User } from "./user.type";

export interface Employee extends User{
    etablishment: Etablishment;
}