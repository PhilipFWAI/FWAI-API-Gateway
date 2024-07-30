import models from '../../../models';
import { FindByAttributesInterface, AccountTypesInterface } from '../../../models/interfaces';

const createAccountType = async (body: AccountTypesInterface): Promise<AccountTypesInterface> => {
    return await models.accountTypes.create(body);
};

const getAccountTypes = async (): Promise<AccountTypesInterface> => {
    return await models.accountTypes.findAll();
};

const findAccountTypeByAttributes = async ({ primaryKey, primaryValue }: FindByAttributesInterface): Promise<AccountTypesInterface> => {
    return await models.accountTypes.findOne({ where: { [primaryKey]: primaryValue } });
};

export default { createAccountType, getAccountTypes, findAccountTypeByAttributes };