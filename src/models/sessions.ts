import { SessionInterface } from './interfaces';
import { Sequelize, Model, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    class Sessions extends Model<SessionInterface> implements SessionInterface {
        declare id: number;
        declare user_id: number;
        declare device_id: string;
        declare access_token: string;
        declare refresh_token: string;
        declare createdAt: Date;
        declare updatedAt: Date;

        static associate(models) {
            Sessions.belongsTo(models.users, { as: 'users', foreignKey: 'user_id' });
        }
    }

    Sessions.init(
        {
            id: { type: dataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            user_id: { type: dataTypes.INTEGER },
            device_id: { type: dataTypes.STRING },
            access_token: { type: dataTypes.STRING },
            refresh_token: { type: dataTypes.STRING },
            createdAt: { field: 'createdAt', type: dataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: dataTypes.DATE },
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'sessions',
            tableName: 'sessions',
        }
    );

    return Sessions;
};