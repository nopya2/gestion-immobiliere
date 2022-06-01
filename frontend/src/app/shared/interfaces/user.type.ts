export interface User {
    id: number;
    username: string;
    email: string;
    roles: string[];
    token: string;
    password: string;
    phoneNumber1: string;
    phoneNumber2: string;
    name: string;
    firstname: string;
    enabled: boolean;
}