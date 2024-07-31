import models from '../../../models';
import { hashPassword } from '../../../utils/passwordUtils';
import { FindByAttributesInterface, FindByTripleAttributesInterface, SessionInterface, UpdateByAttributesInterface, UsersInterface } from '../../../models/interfaces';

const createUser = async (body: UsersInterface): Promise<UsersInterface> => {
    body.password = hashPassword(body.password);
    return await models.users.create({ ...body, is_verified: false });
};

const findUserByAttributes = async ({ primaryKey, primaryValue }: FindByAttributesInterface): Promise<UsersInterface> => {
    return await models.users.findOne({ where: { [primaryKey]: primaryValue } });
};

const updateUserByAttributes = async ({ updatedKey, updatedValue, whereKey, whereValue }: UpdateByAttributesInterface): Promise<UsersInterface> => {
  await models.users.update({ [updatedKey]: updatedValue }, { where: { [whereKey]: whereValue } });
  return await findUserByAttributes({ primaryKey: whereKey, primaryValue: whereValue });
};

const createSession = async (body: SessionInterface): Promise<SessionInterface> => {
    return await models.sessions.create(body);
};

const findSessionByAttributes = async ({ primaryKey, primaryValue, secondaryKey, secondaryValue }: FindByAttributesInterface): Promise<UsersInterface | null> => {
    return await models.sessions.findOne({ where: { [primaryKey]: primaryValue, [secondaryKey]: secondaryValue } });
};

const findSessionByTripleAttributes = async ({ primaryKey, primaryValue, secondaryKey, secondaryValue, tripleKey, tripleValue }: FindByTripleAttributesInterface): Promise<UsersInterface> => {
    return await models.sessions.findOne({ where: { [primaryKey]: primaryValue, [secondaryKey]: secondaryValue, [tripleKey]: tripleValue } });
};

const destroySessionByAttribute = async ({ primaryKey, primaryValue, secondaryKey, secondaryValue }: FindByAttributesInterface): Promise<void> => {
    await models.sessions.destroy({where: { [primaryKey]: primaryValue, [secondaryKey]: secondaryValue }});
};

export default { createUser, findUserByAttributes, updateUserByAttributes, createSession, findSessionByAttributes, findSessionByTripleAttributes, destroySessionByAttribute };
