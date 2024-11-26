import { Dispatch, FC, SetStateAction } from 'react';
import { Card, Col } from 'antd';

import Input from '../../../components/Input/Input';
import { User } from '../../../types/User';

type AddressProps = {
  setEditedUser: Dispatch<SetStateAction<User>>;
  isEditing: boolean;
  user?: User;
};

export const Address: FC<AddressProps> = ({
  setEditedUser,
  isEditing,
  user
}) => {
  return (
    <Col span={8}>
      <Card title="Address">
        <Input
          label="City"
          onChange={e =>
            setEditedUser(prev => ({
              ...prev,
              address: { ...prev.address, city: e.target.value }
            }))
          }
          value={user?.address?.city}
          disabled={!isEditing}
          name="city"
          required
        />

        <Input
          label="Street"
          onChange={e =>
            setEditedUser(prev => ({
              ...prev,
              address: { ...prev.address, street: e.target.value }
            }))
          }
          value={user?.address?.street}
          disabled={!isEditing}
          name="street"
          required
        />

        <Input
          label="Suite"
          onChange={e =>
            setEditedUser(prev => ({
              ...prev,
              address: { ...prev.address, suite: e.target.value }
            }))
          }
          value={user?.address?.suite}
          disabled={!isEditing}
          name="suite"
          required
        />

        <Input
          label="Zipcode"
          onChange={e =>
            setEditedUser(prev => ({
              ...prev,
              address: { ...prev.address, zipcode: e.target.value }
            }))
          }
          value={user?.address?.zipcode}
          disabled={!isEditing}
          name="zipcode"
        />
      </Card>
    </Col>
  );
};
