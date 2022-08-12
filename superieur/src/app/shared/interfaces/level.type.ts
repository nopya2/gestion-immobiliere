import { Diploma } from "./diploma.type";
import { Etablishment } from "./etablishment.type";
import { Faculty } from "./faculty.type";

export interface LevelType {
    id?: number;
    '@id'?: string;
    name: string;
    code: string;
    etablishment?: Etablishment;
    level: string;
    cycle: Cycle;
}

export interface Level {
    id?: number;
    '@id'?: string;
    name: string;
    description: string;
    code: string;
    faculty: Faculty;
    obtainedDiploma: Diploma;
    preparedDiploma: Diploma;
    createdAt?: Date;
    updatedAt?: Date;
    duration: number;
    levelType: LevelType;
    etablishment?: Etablishment;
}

export interface Cycle {
    id?: number;
    '@id'?: string;
    name: string;
    description: string;
    etablishment?: Etablishment;
}