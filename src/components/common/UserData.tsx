import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import { Card, Row, Col, Form, message } from 'antd';

import { User } from '../../types/User';

import { useAppDispatch, useAppSelector } from '../../stores';
import { updateUser } from '../../stores/users';

import FormControls from './FormControls';
import Input from './Input';

type IUserData = {
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

const transformUserData = (user: User): IUserData => {
  return {
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    city: user.address.city,
    street: user.address.street,
    suite: user.address.suite,
    zipcode: user.address.zipcode,
    companyName: user.company.name,
    businessService: user.company.bs,
    catchPhrase: user.company.catchPhrase
  };
};

type UserDataProps = {
  id: User['id'];
};

const UserData: FC<UserDataProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: any) =>
    state.users.users.find((u: User) => u.id === id)
  );

  const [editedUser, setEditedUser] = useState<IUserData>(
    transformUserData(user)
  );
  const [isChanged, setIsChanged] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => setEditedUser(transformUserData(user)), [user]);
  useEffect(() => {
    setIsChanged(
      JSON.stringify(editedUser) !== JSON.stringify(transformUserData(user))
    );
  }, [editedUser, user]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEditedUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setIsChanged(true);
  }, []);

  const handleSubmit = useCallback(() => {
    const {
      username = editedUser.username.trim(),
      email = editedUser.email.trim(),
      street = editedUser.street.trim(),
      suite = editedUser.suite.trim(),
      city = editedUser.city.trim()
    } = editedUser;

    if (!username || !email || !street || !suite || !city) {
      message.error('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.error('Please enter a valid email address.');
      return;
    }
    if (username.length < 3) {
      message.error('Username must be at least 3 characters long.');
      return;
    }

    dispatch(updateUser({ id: user.id, updatedUser: editedUser }));
    message.success('User updated successfully.');
    setIsChanged(false);
  }, [editedUser, user.id]);

  const handleRevert = useCallback(() => {
    setEditedUser(transformUserData(user));
    message.info('Changes reverted.');
    setIsChanged(false);
  }, [user]);

  return (
    <Form>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="General Information">
            <Input
              label="Username"
              name="username"
              onChange={handleChange}
              disabled={!isEditing}
              value={editedUser.username}
              required
            />

            <Input
              label="Email"
              onChange={handleChange}
              value={editedUser?.email}
              disabled={!isEditing}
              name="email"
              type="email"
              required
            />

            <Input
              label="Phone"
              onChange={handleChange}
              value={editedUser?.phone}
              disabled={!isEditing}
              name="phone"
            />

            <Input
              label="Website"
              onChange={handleChange}
              value={editedUser?.website}
              disabled={!isEditing}
              name="website"
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Address">
            <Input
              label="City"
              onChange={handleChange}
              value={editedUser?.city}
              disabled={!isEditing}
              name="city"
              required
            />

            <Input
              label="Street"
              onChange={handleChange}
              value={editedUser?.street}
              disabled={!isEditing}
              name="street"
              required
            />

            <Input
              label="Suite"
              onChange={handleChange}
              value={editedUser?.suite}
              disabled={!isEditing}
              name="suite"
              required
            />

            <Input
              label="Zipcode"
              onChange={handleChange}
              value={editedUser?.zipcode}
              disabled={!isEditing}
              name="zipcode"
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Company">
            <Input
              label="Name"
              onChange={handleChange}
              value={editedUser?.companyName}
              disabled={!isEditing}
              name="companyName"
            />

            <Input
              label="Business Service"
              onChange={handleChange}
              value={editedUser?.businessService}
              disabled={!isEditing}
              name="businessService"
            />

            <Input
              label="Catch Phrase"
              onChange={handleChange}
              value={editedUser?.catchPhrase}
              disabled={!isEditing}
              name="catchPhrase"
            />
          </Card>
        </Col>
      </Row>

      <FormControls
        disableSubmit={!isChanged || !isEditing}
        disableRevert={!isChanged || !isEditing}
        onSubmit={handleSubmit}
        onRevert={handleRevert}
        onEdit={!isEditing ? () => setIsEditing(true) : undefined}
        onCancel={
          isEditing
            ? () => {
                setEditedUser(transformUserData(user));
                setIsEditing(false);
              }
            : undefined
        }
      />
    </Form>
  );
};

export default memo(UserData);
