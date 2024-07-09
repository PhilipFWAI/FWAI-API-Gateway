import { Sequelize, Model, DataTypes } from 'sequelize';
import { SessionInterface } from '../../types/modelsTypes';

module.exports = (sequelize: Sequelize) => {
    class sessions extends Model<SessionInterface> 
        implements SessionInterface {
            declare userId: number;
            declare deviceId: string;
            declare access_token: string;
            declare refresh_token: string;
            declare createdAt: Date;
            declare updatedAt: Date;
            static associate (models) {
                sessions.belongsTo(models.users, { as: 'user', foreignKey: 'userId' });
            }
        }
    
    sessions.init(
        {
            userId: { type: DataTypes.INTEGER },
            deviceId: { type: DataTypes.STRING },
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