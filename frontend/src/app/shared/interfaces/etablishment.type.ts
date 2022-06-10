export interface Etablishment {
    "@id"?: string;
    id?: string;
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
    logo?: string;
    website?: string;
    createdAt?: Date;
    updatedAt?: Date;
    phones: string[];
    url: string;
}