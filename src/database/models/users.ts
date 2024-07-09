import { Sequelize, Model, DataTypes } from 'sequelize';
import { UsersInterface } from '../../types/modelsTypes';



module.exports = (sequelize: Sequelize) => {
    class users extends Model<UsersInterface>
        implements UsersInterface {
            declare accountTypeId: number;
            declare username: string;
            declare email: string
            declare password: string;
            declare isVerified: boolean;
            declare createdAt: Date;
            declare updatedAt: Date;
            static associate (models) {
                users.hasMany(models.sessions, { as: 'session', foreignKey: 'userId' }),
                users.belongsTo(models.accountTypes, { as: 'accountType', foreignKey: 'accountTypeId' });
            }
        }
    
    users.init(
        {
            accountTypeId: { type: DataTypes.INTEGER },
            username: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            isVerified: { type: DataTypes.BOOLEAN },
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'users',
            tableName: 'users',
        }
    );

    return users;
};