import { Sequelize, Dialect } from 'sequelize';

export interface DB {
    [key: string]: any;
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
}

export interface DBConfig {
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
    accountTypeId: number;
    username: string;
    email: string;
    password: string;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SessionInterface {
    userId: number,
    deviceId: string,
    access_token: string,
    refresh_token: string,
    createdAt?: Date;
    updatedAt?: Date;
}
