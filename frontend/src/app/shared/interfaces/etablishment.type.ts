import { Image } from "./image.type";
import { EtablishmentTypeEnum } from '../enumarations/etablishment-type.enum';

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
}