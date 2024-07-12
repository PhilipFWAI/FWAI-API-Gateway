import { ExtendRequest } from '../types/commonTypes';
import { CustomerInterface } from '../types/strapiTypes';

export const customerInfoUtil = async (req: ExtendRequest): Promise<CustomerInterface>=> {
    let customerInfo: CustomerInterface;
    if (req.body.customerInfo && req.body.customerInfo.email) {
      customerInfo = req.body.customerInfo;
    } else {
        customerInfo = { email: req.user.email };
    }

    return customerInfo;
};
  