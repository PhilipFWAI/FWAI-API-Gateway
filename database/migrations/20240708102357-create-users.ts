import { QueryInterface, DataTypes  } from 'sequelize';

module.exports = { async up(queryInterface: QueryInterface) { await queryInterface.createTable('users', {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    accountType_id: { type: DataTypes.INTEGER , allowNull: false, references:{ model: 'accountTypes', key: 'id' }},
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true  },
    password: { type: DataTypes.STRING, allowNull: false, },
    is_verified: { allowNull: false, type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { allowNull: false, type: DataTypes.DATE },
    updatedAt: { allowNull: false, type: DataTypes.DATE },
}); }, async down(queryInterface: QueryInterface) { await queryInterface.dropTable('users'); } };
