import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

module.exports = {
    development: {
        logging: false as boolean,
        dialect: 'sqlite' as Dialect,
        storage: path.join(__dirname, 'database.sqlite'),
        host:  process.env.DATABASE_HOST_DEVELOPMENT as string,
        username:  process.env.DATABASE_USERNAME_DEVELOPMENT as string,
        password:  process.env.DATABASE_PASSWORD_DEVELOPMENT as string,
    },
    production: {
        logging: false as boolean,
        dialect: 'sqlite' as Dialect,
        storage: path.join(__dirname, 'database.sqlite'),
        host:  process.env.DATABASE_HOST_DEVELOPMENT as string,
        username:  process.env.DATABASE_USERNAME_DEVELOPMENT as string,
        password:  process.env.DATABASE_PASSWORD_DEVELOPMENT as string,
    },
};
