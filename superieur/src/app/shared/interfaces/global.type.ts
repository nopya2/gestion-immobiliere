export interface Permission {
    id?: number;
    '@id'?: string;
    name: string;
    slug: string;
}

export interface Module {
    id?: number;
    '@id'?: string;
    name: string;
    slug: string;
    description?: string;
    permissions?: Permission[]
}

export interface Privilege {
    id?: number;
    '@id'?: string;
    module: Module;
    permission: Permission
}

export interface Role {
    id?: number;
    '@id'?: string;
    name: string;
    description?: string;
    privileges: Privilege[]
}
