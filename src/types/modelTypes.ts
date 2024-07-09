import { Sequelize, Dialect, Model, ModelStatic, ModelCtor } from 'sequelize';

export interface DB {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    [key: string]: ModelStatic<Model> | ModelCtor<Model> | Sequelize | typeof Sequelize;
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
    createdAt: Date;
    updatedAt: Date;
}

export interface UsersInterface {
    accountTypeId: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SessionInterface {
    userId: number,
    deviceId: string,
    access_token: string,
    refresh_token: string,
    createdAt: Date;
    updatedAt: Date;
}
