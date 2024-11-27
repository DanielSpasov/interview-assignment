import { ChangeEventHandler, FC } from 'react';
import { Card, Col } from 'antd';

import Input from '../../../components/Input/Input';
import { User } from '../../../types/User';

type GeneralInformationProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  data: Pick<User, 'username' | 'email' | 'phone' | 'website'>;
};

export const GeneralInformation: FC<GeneralInformationProps> = ({
  onChange,
  disabled,
  data
}) => {
  return (
    <Col span={8}>
      <Card title="General Information">
        <Input
          label="Username"
          name="username"
          onChange={onChange}
          disabled={disabled}
          value={data?.username}
          required
        />

        <Input
          label="Email"
          onChange={onChange}
          value={data?.email}
          disabled={disabled}
          name="email"
          type="email"
          required
        />

        <Input
          label="Phone"
          onChange={onChange}
          value={data?.phone}
          disabled={disabled}
          name="phone"
        />

        <Input
          label="Website"
          onChange={onChange}
          value={data?.website}
          disabled={disabled}
          name="website"
        />
      </Card>
    </Col>
  );
};
