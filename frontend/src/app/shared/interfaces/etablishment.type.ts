import { Image } from "./image.type";
import { EtablishmentTypeEnum } from '../enumerations/etablishment-type.enum';
import { Manager } from "./manager.type";

export interface Information {
    "@id"?: string;
    id?: number;
    academicYear: string;
    startYear: Date;
    endYear: Date;
}

export interface Etablishment {
    "@id"?: string;
    id?: string;
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
    logo?: Image;
    website?: string;
    createdAt?: Date;
    updatedAt?: Date;
    phones: string[];
    etablishmentType: EtablishmentTypeEnum;
    postalBox?: string;
    manager?: Manager;
    information?: Information
}