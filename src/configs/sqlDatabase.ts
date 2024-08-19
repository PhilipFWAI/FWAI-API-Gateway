import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
    database: process.env.DB_POSTGRESQL_DATABASE as string,
    username: process.env.DB_POSTGRESQL_USERNAME as string,
    password: process.env.DB_POSTGRESQL_PASSWORD as string,
    user: process.env.DB_POSTGRESQL_USERNAME as string,
    port: process.env.DB_POSTGRESQL_PORT as string,
    host: process.env.DB_POSTGRESQL_HOST as string,
    dialect: 'postgres' as Dialect,
    logging: false as boolean,
    dialectOptions: {
        ssl: { rejectUnauthorized: false },
    },
};
