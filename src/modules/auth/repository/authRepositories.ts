import models from '../../../database/models/index';
import { hashPassword } from '../../../utils/passwordUtils';
import { SessionInterface, UsersInterface } from '../../../types/modelsTypes';

const { users, sessions } = models;

const createUser = async (body: UsersInterface): Promise<UsersInterface> => {
    body.password = hashPassword(body.password);
    return await users.create({ ...body, isVerified: true });
};

const findUserByAttributes = async (key: string, value: string | boolean): Promise<UsersInterface> => {
    return await users.findOne({ where: { [key]: value } });
};

const createSession = async (body: SessionInterface): Promise<SessionInterface> => {
    return await sessions.create({ body, isVerified: true });
};

export default { createUser, findUserByAttributes, createSession };
