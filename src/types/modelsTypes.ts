import { Sequelize, Dialect } from 'sequelize';

export interface DBInterface {
    [key: string]: any;
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
}

export interface DBConfigInterface {
    url?: string;
    host?: string;
    dialect: Dialect;
    storage?: string;
    username?: string;
    password?: string;
    database?: string;
    logging?: boolean | ((sql: string, timing?: number) => void);
}

export interface AccountTypesInterface {
    accountType: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UsersInterface {
    id?: number;
    accountType_id: number;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SessionInterface {
    user_id?: number,
    device_id?: string,
    access_token?: string,
    refresh_token?: string,
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FindByAttributesInterface {
    primaryKey: string;
    primaryValue: number | string | boolean;
    secondaryKey?: string;
    secondaryValue?: number | string | boolean;
}

export interface FindByTripleAttributesInterface {
    primaryKey: string;
    primaryValue: number | string | boolean;
    secondaryKey: string;
    secondaryValue: number | string | boolean;
    tripleKey: string;
    tripleValue: number | string | boolean;
}

export interface UpdateByAttributesInterface {
    updatedKey: string;
    updatedValue: number | string | boolean;
    whereKey?: string;
    whereValue?: number | string | boolean;
}
