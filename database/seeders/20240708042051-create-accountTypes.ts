import { QueryInterface } from 'sequelize';

const accountOne = {
    accountType: 'personal',
    createdAt: new Date(),
    updatedAt: new Date(),
};

const accountTwo = {
    accountType: 'business',
    createdAt: new Date(),
    updatedAt: new Date(),
};

const accountThree = {
    accountType: 'enterprize',
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
