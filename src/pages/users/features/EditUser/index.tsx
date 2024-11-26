import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Form, message } from 'antd';

import FormControls from '../../../../shared/components/FormControls';
import Input from '../../../../shared/components/Input/Input';

import { selectUsersState, updateUser } from '../../usersSlice';
import { UserData, EditUserProps } from './types';
import { validateUserData } from './validators';
import { transformUserData } from './utils';

const EditUser: FC<EditUserProps> = ({ id }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(selectUsersState);

  const user = useMemo(
    () => users.find(user => user.id === Number(id)),
    [id, users]
  );

  const [editedUser, setEditedUser] = useState<UserData>(
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
    const error = validateUserData(editedUser);
    if (error) {
      message.error(error);
      return;
    }

    dispatch(updateUser({ id: user?.id, updatedUser: editedUser }));
    message.success('User updated successfully.');
    setIsChanged(false);
  }, [dispatch, editedUser, user?.id]);

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

export default memo(EditUser);
