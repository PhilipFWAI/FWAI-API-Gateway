import models from '../../../database/models';
import { AccountTypesInterface, FindByAttributesInterface } from '../../../types/modelsTypes';

const { accountTypes } = models;

const createAccountType = async (body: AccountTypesInterface): Promise<AccountTypesInterface> => {
    return await accountTypes.create(body);
};

const getAccountTypes = async (): Promise<AccountTypesInterface> => {
    return await accountTypes.findAll();
};

const findAccountTypeByAttributes = async ({ primaryKey, primaryValue }: FindByAttributesInterface): Promise<AccountTypesInterface> => {
    return await accountTypes.findOne({ where: { [primaryKey]: primaryValue } });
};

export default { createAccountType, getAccountTypes, findAccountTypeByAttributes };
