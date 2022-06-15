export interface User {
    "@id": string;
    id?: number;
    name: string;
    firstname: string;
    username: string;
    email: string;
    roles: string[];
    token?: string;
    password?: string;
    phoneNumber1: string;
    phoneNumber2?: string;
    enabled: boolean;
}