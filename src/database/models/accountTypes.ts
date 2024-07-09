import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { AccountTypesInterface } from '../../types/modelTypes';

module.exports = (sequelize: Sequelize) => {
    class AccountTypes extends Model<AccountTypesInterface> 
        implements AccountTypesInterface {
            declare accountType: string;
            declare createdAt: Date;
            declare updatedAt: Date;
            static associate (models: { [key: string]: ModelCtor<Model> }) {
                AccountTypes.hasOne(models.users, { as: 'user', foreignKey: 'accountTypeId' });
            }
        }
    
    AccountTypes.init(
        {
            accountType: { type: DataTypes.STRING },
            createdAt: { type: DataTypes.DATE, field: 'createdAt' },
            updatedAt: { type: DataTypes.DATE, field: 'updatedAt' },
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
