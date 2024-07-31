import { AccountTypesInterface } from './interfaces';
import { Sequelize, Model, DataTypes } from 'sequelize';

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    class AccountTypes extends Model<AccountTypesInterface> implements AccountTypesInterface {
        declare id: number;
        declare accountType: string;
        declare createdAt: Date;
        declare updatedAt: Date;

        static associate(models) {
            AccountTypes.hasMany(models.users, { as: 'users', foreignKey: 'accountType_id' });
        }
    }

    AccountTypes.init(
        {
            id: { type: dataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            accountType: { type: dataTypes.STRING },
            createdAt: { type: dataTypes.DATE },
            updatedAt: { type: dataTypes.DATE },
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'accountTypes',
            tableName: 'accountTypes',
        }
    );

    return AccountTypes;
};
