import { IUserData } from './types';

export const validateUserData = (data: Partial<IUserData>) => {
  const {
    username = data.username?.trim(),
    email = data.email?.trim(),
    street = data.street?.trim(),
    suite = data.suite?.trim(),
    city = data.city?.trim()
  } = data;

  if (!username || !email || !street || !suite || !city) {
    return 'Please fill in all required fields.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address.';
  }

  if (username.length < 3) {
    return 'Username must be at least 3 characters long.';
  }

  return false;
};
