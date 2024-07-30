import { UsersInterface } from './index';
import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize) => {
    class users extends Model<UsersInterface>
        implements UsersInterface {
            declare accountType_id: number;
            declare username: string;
            declare email: string
            declare password: string;
            declare isVerified: boolean;
            declare createdAt: Date;
            declare updatedAt: Date;
            static associate (models) {
                users.hasMany(models.sessions, { as: 'session', foreignKey: 'user_id' });
                users.belongsTo(models.accountTypes, { as: 'accountType', foreignKey: 'accountType_id' });
            }
        }
    
    users.init(
        {
            accountType_id: { type: DataTypes.INTEGER },
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