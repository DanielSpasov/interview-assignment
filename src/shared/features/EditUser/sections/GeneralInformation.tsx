import { Dispatch, FC, SetStateAction } from 'react';
import { Card, Col } from 'antd';

import Input from '../../../components/Input/Input';
import { User } from '../../../types/User';

type GeneralInformationProps = {
  setEditedUser: Dispatch<SetStateAction<User>>;
  isEditing: boolean;
  user?: User;
};

export const GeneralInformation: FC<GeneralInformationProps> = ({
  setEditedUser,
  isEditing,
  user
}) => {
  return (
    <Col span={8}>
      <Card title="General Information">
        <Input
          label="Username"
          name="username"
          onChange={e =>
            setEditedUser(prev => ({ ...prev, username: e.target.value }))
          }
          disabled={!isEditing}
          value={user?.username}
          required
        />

        <Input
          label="Email"
          onChange={e =>
            setEditedUser(prev => ({ ...prev, email: e.target.value }))
          }
          value={user?.email}
          disabled={!isEditing}
          name="email"
          type="email"
          required
        />

        <Input
          label="Phone"
          onChange={e =>
            setEditedUser(prev => ({ ...prev, phone: e.target.value }))
          }
          value={user?.phone}
          disabled={!isEditing}
          name="phone"
        />

        <Input
          label="Website"
          onChange={e =>
            setEditedUser(prev => ({ ...prev, website: e.target.value }))
          }
          value={user?.website}
          disabled={!isEditing}
          name="website"
        />
      </Card>
    </Col>
  );
};
