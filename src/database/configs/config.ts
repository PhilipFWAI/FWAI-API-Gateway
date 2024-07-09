import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
    development: {
        logging: false as boolean,
        dialect: 'sqlite' as Dialect,
        host:  process.env.DATABASE_HOST_DEVELOPMENT as string,
        storage: process.env.DATABASE_DATABASE_DEVELOPMENT as string,
        username:  process.env.DATABASE_USERNAME_DEVELOPMENT as string,
        password:  process.env.DATABASE_PASSWORD_DEVELOPMENT as string,
    },
    production: {
        logging: false as boolean,
        dialect: 'sqlite' as Dialect,
        host:  process.env.DATABASE_HOST_PRODUCTION as string,
        storage: process.env.DATABASE_DATABASE_PRODUCTION as string,
        username:  process.env.DATABASE_USERNAME_PRODUCTION as string,
        password:  process.env.DATABASE_PASSWORD_PRODUCTION as string,
    },
};
