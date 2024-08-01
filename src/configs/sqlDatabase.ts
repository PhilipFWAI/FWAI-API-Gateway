import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
    logging: false as boolean,
    dialect: 'sqlite' as Dialect,
    host: process.env.DB_SQLITE_HOST as string,
    storage: process.env.DB_SQLITE_DATABASE as string,
    username: process.env.DB_SQLITE_USERNAME as string,
    password: process.env.DB_SQLITE_PASSWORD as string,
};
