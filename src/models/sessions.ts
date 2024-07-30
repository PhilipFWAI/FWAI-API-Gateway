import { SessionInterface } from './index';
import { Sequelize, Model, DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize) => {
    class sessions extends Model<SessionInterface> 
        implements SessionInterface {
            declare user_id: number;
            declare device_id: string;
            declare access_token: string;
            declare refresh_token: string;
            declare createdAt: Date;
            declare updatedAt: Date;
            static associate (models) {
                sessions.belongsTo(models.users, { as: 'user', foreignKey: 'user_id' });
            }
        }
    
    sessions.init(
        {
            user_id: { type: DataTypes.INTEGER },
            device_id: { type: DataTypes.STRING },
            access_token: { type: DataTypes.STRING },
            refresh_token: { type: DataTypes.STRING },
            createdAt: { field: 'createdAt', type: DataTypes.DATE },
            updatedAt: { field: 'updatedAt', type: DataTypes.DATE },
            
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'sessions',
            tableName: 'sessions',
        }
    );

    return sessions;
};