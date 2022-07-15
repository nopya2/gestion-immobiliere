import { Etablishment } from "./etablishment.type";

export interface LevelType {
    id?: number;
    '@id'?: string;
    name: string;
    code: string;
    etablishment?: Etablishment;
}