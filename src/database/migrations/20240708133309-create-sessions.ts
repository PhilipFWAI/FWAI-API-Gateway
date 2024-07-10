import { QueryInterface, DataTypes  } from 'sequelize';

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('sessions', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, unique: true },
    userId: { type: DataTypes.INTEGER , allowNull: false, references:{ model: 'users', key: 'id' }},
    deviceId: { type: DataTypes.STRING },
    access_token: { type: DataTypes.STRING },
    refresh_token: { type: DataTypes.STRING },
    createdAt: { allowNull: false, type: DataTypes.DATE },
    updatedAt: { allowNull: false, type: DataTypes.DATE },
}); }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('sessions'); }, };
