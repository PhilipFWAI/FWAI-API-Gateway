import httpStatus from 'http-status';
import responseUtils from '../../../utils/responseUtils';
import accountRepository from '../repository/accountRepository';

const createAccountType = async (req, res) => {
  try {
    const accountType = await accountRepository.createAccountType(req.body);

    responseUtils.handleSuccess(httpStatus.CREATED, 'Account type created successfully.', { accountType });
    return responseUtils.response(res);
  } catch (error) {    
    responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
    return responseUtils.response(res);
  }
};

const getAccountTypes = async (req, res) => {
  try {
    const accountTypes = await accountRepository.getAccountTypes();
    
    responseUtils.handleSuccess(httpStatus.OK, 'Account types viewed successfully', { accountTypes });
    return responseUtils.response(res);
  } catch (error) {    
    responseUtils.handleError(httpStatus.INTERNAL_SERVER_ERROR, error);
    return responseUtils.response(res);
  }
};

export default { createAccountType, getAccountTypes };
