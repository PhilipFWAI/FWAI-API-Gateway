import { AuthManagementsInterface } from './interfaces';
import { Sequelize, Model, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    class AuthManagements extends Model<AuthManagementsInterface> implements AuthManagementsInterface {
        declare id: number;
        declare user_id: number;
        declare platform: string;
        declare access_token: string;
        declare refresh_token: string;
        declare createdAt: Date;
        declare updatedAt: Date;

        static associate(models) {
            AuthManagements.belongsTo(models.users, { as: 'users', foreignKey: 'user_id' });
        }
    }

    AuthManagements.init(
        {
            id: { type: dataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            user_id: { type: dataTypes.INTEGER },
            platform: { type: dataTypes.STRING },
            access_token: { type: dataTypes.STRING },
            refresh_token: { type: dataTypes.STRING },
            createdAt: { field: 'createdAt', type: dataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: dataTypes.DATE },
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'authManagements',
            tableName: 'authManagements',
        }
    );

    return AuthManagements;
};