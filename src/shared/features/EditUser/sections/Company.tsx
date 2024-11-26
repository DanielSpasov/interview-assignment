import { FC, Dispatch, SetStateAction } from 'react';
import { Card, Col } from 'antd';

import Input from '../../../components/Input/Input';
import { User } from '../../../types/User';

type CompanyProps = {
  setEditedUser: Dispatch<SetStateAction<User>>;
  isEditing: boolean;
  user?: User;
};

export const Company: FC<CompanyProps> = ({
  setEditedUser,
  isEditing,
  user
}) => {
  return (
    <Col span={8}>
      <Card title="Company">
        <Input
          label="Name"
          onChange={e =>
            setEditedUser(prev => ({
              ...prev,
              company: { ...prev.company, name: e.target.value }
            }))
          }
          value={user?.company.name}
          disabled={!isEditing}
          name="companyName"
        />

        <Input
          label="Business Service"
          onChange={e =>
            setEditedUser(prev => ({
              ...prev,
              company: { ...prev.company, bs: e.target.value }
            }))
          }
          value={user?.company.bs}
          disabled={!isEditing}
          name="businessService"
        />

        <Input
          label="Catch Phrase"
          onChange={e =>
            setEditedUser(prev => ({
              ...prev,
              company: { ...prev.company, catchPhrase: e.target.value }
            }))
          }
          value={user?.company.catchPhrase}
          disabled={!isEditing}
          name="catchPhrase"
        />
      </Card>
    </Col>
  );
};
