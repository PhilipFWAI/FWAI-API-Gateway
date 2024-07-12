import fs from 'fs';
import path from 'path';
import * as dbConnection from '../configs/config';
import { DBInterface, DBConfigInterface } from '../../types/modelsTypes';
import { Sequelize, DataTypes, Model, ModelStatic } from 'sequelize';

const db: Partial<DBInterface> = {};
let sequelize: Sequelize;
const basename = path.basename(__filename);
const env: string = process.env.NODE_ENV || 'development';
const config = dbConnection[env as keyof typeof dbConnection] as DBConfigInterface;

if (config.url) {
    sequelize = new Sequelize(config.url, config);
} else {
    if (!config.username || !config.password) {
        throw new Error('Database configuration is incomplete.');
    }
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter((file: string) => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts';
    })
    .forEach((file: string) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes) as ModelStatic<Model>;
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    const model = db[modelName] as ModelStatic<Model> & { associate?: (db: DBInterface) => void };
    if (model.associate) {
        model.associate(db as DBInterface);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db as DBInterface;
