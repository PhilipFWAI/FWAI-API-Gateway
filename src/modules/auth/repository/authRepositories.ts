import models from '../../../database/models/index';
import { hashPassword } from '../../../utils/passwordUtils';
import { SessionInterface, UsersInterface } from '../../../types/modelsTypes';

const { users, sessions } = models;

const createUser = async (body: UsersInterface): Promise<UsersInterface> => {
    body.password = hashPassword(body.password);
    return await users.create({ ...body, isVerified: false });
};

const findUserByAttributes = async (key: string, value: number | string | boolean): Promise<UsersInterface> => {
    return await users.findOne({ where: { [key]: value } });
};

const updateUserByAttributes = async (updatedKey: string, updatedValue: number | string | boolean, whereKey: string, whereValue: number | string | boolean): Promise<UsersInterface> => {
  await users.update({ [updatedKey]: updatedValue }, { where: { [whereKey]: whereValue } });
  return await findUserByAttributes(whereKey, whereValue);
};

const createSession = async (body: SessionInterface): Promise<SessionInterface> => {
    return await sessions.create(body);
};

const findSessionByAttributes = async (primaryKey: string, primaryValue: number | string | boolean, secondaryKey: string, secondaryValue: number | string | boolean): Promise<UsersInterface> => {
    return await sessions.findOne({ where: { [primaryKey]: primaryValue, [secondaryKey]: secondaryValue, } });
};

const destroySessionByAttribute = async (primaryKey: string, primaryValue: number | string, secondaryKey: string, secondaryValue: string): Promise<void> => {
    await sessions.destroy({where: { [primaryKey]: primaryValue, [secondaryKey]: secondaryValue }});
};

export default { createUser, findUserByAttributes, updateUserByAttributes, createSession, findSessionByAttributes, destroySessionByAttribute};
