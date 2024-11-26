import { User } from '../types/User';

export const validateUserData = (data: User) => {
  const username = data.username.trim();
  const email = data.email.trim();
  const street = data.address.street.trim();
  const suite = data.address.suite.trim();
  const city = data.address.city.trim();

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
