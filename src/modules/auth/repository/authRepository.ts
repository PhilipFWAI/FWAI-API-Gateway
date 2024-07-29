import models from '../../../database/models';
import { hashPassword } from '../../../utils/passwordUtils';
import { FindByAttributesInterface, FindByTripleAttributesInterface, SessionInterface, UpdateByAttributesInterface, UsersInterface } from '../../../types/modelsTypes';

const { users, sessions } = models;

const createUser = async (body: UsersInterface): Promise<UsersInterface> => {
    body.password = hashPassword(body.password);
    return await users.create({ ...body, isVerified: false });
};

const findUserByAttributes = async ({ primaryKey, primaryValue }: FindByAttributesInterface): Promise<UsersInterface> => {
    return await users.findOne({ where: { [primaryKey]: primaryValue } });
};

const updateUserByAttributes = async ({ updatedKey, updatedValue, whereKey, whereValue }: UpdateByAttributesInterface): Promise<UsersInterface> => {
  await users.update({ [updatedKey]: updatedValue }, { where: { [whereKey]: whereValue } });
  return await findUserByAttributes({ primaryKey: whereKey, primaryValue: whereValue });
};

const createSession = async (body: SessionInterface): Promise<SessionInterface> => {
    return await sessions.create(body);
};

const findSessionByAttributes = async ({ primaryKey, primaryValue, secondaryKey, secondaryValue }: FindByAttributesInterface): Promise<UsersInterface | null> => {
    return await sessions.findOne({ where: { [primaryKey]: primaryValue, [secondaryKey]: secondaryValue } });
};

const findSessionByTripleAttributes = async ({ primaryKey, primaryValue, secondaryKey, secondaryValue, tripleKey, tripleValue }: FindByTripleAttributesInterface): Promise<UsersInterface> => {
    return await sessions.findOne({ where: { [primaryKey]: primaryValue, [secondaryKey]: secondaryValue, [tripleKey]: tripleValue } });
};

const destroySessionByAttribute = async ({ primaryKey, primaryValue, secondaryKey, secondaryValue }: FindByAttributesInterface): Promise<void> => {
    await sessions.destroy({where: { [primaryKey]: primaryValue, [secondaryKey]: secondaryValue }});
};

export default { createUser, findUserByAttributes, updateUserByAttributes, createSession, findSessionByAttributes, findSessionByTripleAttributes, destroySessionByAttribute };
