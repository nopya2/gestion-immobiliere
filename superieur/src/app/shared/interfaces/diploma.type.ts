import { Etablishment } from "./etablishment.type";

export interface Diploma {
    id?: number;
    '@id'?: string;
    name: string;
    description: string;
    duration: number;
    etablishment?: Etablishment;
}