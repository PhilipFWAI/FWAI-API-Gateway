import { QueryInterface, DataTypes  } from 'sequelize';

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('accountTypes', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    accountType: { type: DataTypes.STRING, allowNull: false, unique: true },
    createdAt: { allowNull: false, type: DataTypes.DATE },
    updatedAt: { allowNull: false, type: DataTypes.DATE },
}); }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('accountTypes'); } };