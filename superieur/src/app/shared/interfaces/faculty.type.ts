import { Diploma } from "./diploma.type";
import { Etablishment } from "./etablishment.type";

export interface Faculty {
    "@id"?: string;
    id?: number;
    name: string;
    description: string;
    code: string;
    etablishment?: Etablishment;
    diplomas?: Diploma[]
}