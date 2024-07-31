import { UsersInterface } from './interfaces';
import { Sequelize, Model, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    class Users extends Model<UsersInterface> implements UsersInterface {
        declare id: number;
        declare accountType_id: number;
        declare username: string;
        declare email: string;
        declare password: string;
        declare is_verified: boolean;
        declare createdAt: Date;
        declare updatedAt: Date;

        static associate(models) {
            Users.belongsTo(models.accountTypes, { as: 'accountTypes', foreignKey: 'accountType_id' });
            Users.hasMany(models.sessions, { as: 'sessions', foreignKey: 'user_id' });
        }
    }

    Users.init(
        {
            id: { type: dataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            accountType_id: { type: dataTypes.INTEGER },
            username: { type: dataTypes.STRING },
            email: { type: dataTypes.STRING },
            password: { type: dataTypes.STRING },
            is_verified: { type: dataTypes.BOOLEAN },
            createdAt: { type: dataTypes.DATE },
            updatedAt: { type: dataTypes.DATE },
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'users',
            tableName: 'users',
        }
    );

    return Users;
};
