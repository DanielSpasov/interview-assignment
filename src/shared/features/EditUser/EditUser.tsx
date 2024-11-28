import { ChangeEvent, FC, memo, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Form, message } from 'antd';

import FormControls from '../../components/FormControls/FormControls';
import { updateUser } from '../../../pages/users/usersSlice';
import { validateUserData } from './validations';
import { User } from '../../types/User';

import { GeneralInformation } from './sections/GeneralInformation';
import { Address } from './sections/Address';
import { Company } from './sections/Company';

const EditUser: FC<{ user: User }> = ({ user }) => {
  const dispatch = useDispatch();

  const [editedUser, setEditedUser] = useState<User>(user);
  const [isEditing, setIsEditing] = useState(false);

  const isChanged = useMemo(
    () => JSON.stringify(editedUser) !== JSON.stringify(user),
    [editedUser, user]
  );

  const handleSubmit = () => {
    const error = validateUserData(editedUser);
    if (error) return message.error(error);

    dispatch(updateUser({ id: user?.id, updatedUser: editedUser }));
    message.success('User updated successfully.');
  };

  const handleRevert = () => {
    setEditedUser(user);
    message.info('Changes reverted.');
  };

  const handleGeneralUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddressUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedUser(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [e.target.name]: e.target.value
      }
    }));
  };

  const handleCompanyUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedUser(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [e.target.name]: e.target.value
      }
    }));
  };

  return (
    <Form>
      <Row gutter={16}>
        <GeneralInformation
          onChange={handleGeneralUpdate}
          disabled={!isEditing}
          data={{
            email: editedUser.email,
            phone: editedUser.phone,
            username: editedUser.username,
            website: editedUser.website
          }}
        />
        <Address
          onChange={handleAddressUpdate}
          disabled={!isEditing}
          data={editedUser.address}
        />
        <Company
          onChange={handleCompanyUpdate}
          disabled={!isEditing}
          data={editedUser.company}
        />
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
                setEditedUser(user);
                setIsEditing(false);
              }
            : undefined
        }
      />
    </Form>
  );
};

export default memo(EditUser);
