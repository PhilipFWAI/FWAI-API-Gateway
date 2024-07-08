import { QueryInterface } from 'sequelize';

const accountOne = {
    accountType: 'business',
    createdAt: new Date(),
    updatedAt: new Date(),
};

const accountTwo = {
    accountType: 'personal',
    createdAt: new Date(),
    updatedAt: new Date(),
};

const accountThree = {
    accountType: 'developer',
    createdAt: new Date(),
    updatedAt: new Date(),
};

const up = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkInsert('accountTypes', [accountOne, accountTwo, accountThree]);
};

const down = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('accountTypes', {}, {});
};

export { up, down };
