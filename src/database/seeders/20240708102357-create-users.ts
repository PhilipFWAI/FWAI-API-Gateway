import { QueryInterface } from 'sequelize';
import { hashPassword } from '../../utils/passwordUtils';

const userOne = {
  accountTypeId: 2,
  username: 'Josue',
  email: 'josue@firstwaveai.com',
  password: hashPassword('Qwerty@123'),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.bulkInsert('users', [userOne]);
};

const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.bulkDelete('users', {}, {});
};

export { up, down };
