import { User } from '../../types/User';

export type IUserData = {
  username: User['name'];
  email: User['email'];
  phone: User['phone'];
  website: User['website'];
  city: User['address']['city'];
  street: User['address']['street'];
  suite: User['address']['suite'];
  zipcode: User['address']['zipcode'];
  companyName: User['company']['name'];
  businessService: User['company']['bs'];
  catchPhrase: User['company']['catchPhrase'];
};

export type UserDataProps = {
  id: User['id'];
};
