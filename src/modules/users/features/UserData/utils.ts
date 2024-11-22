import { User } from '../../../../shared/types/User';
import { IUserData } from './types';

export const transformUserData = (user?: User): IUserData => {
  return {
    username: user?.username,
    email: user?.email,
    phone: user?.phone,
    website: user?.website,
    city: user?.address.city,
    street: user?.address.street,
    suite: user?.address.suite,
    zipcode: user?.address.zipcode,
    companyName: user?.company.name,
    businessService: user?.company.bs,
    catchPhrase: user?.company.catchPhrase
  };
};