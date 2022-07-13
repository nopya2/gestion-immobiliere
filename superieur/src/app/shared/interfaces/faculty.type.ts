import { Etablishment } from "./etablishment.type";

export interface Faculty {
    "@id"?: string;
    id?: number;
    name: string;
    description: string;
    code: string;
    etablishment?: Etablishment;
}