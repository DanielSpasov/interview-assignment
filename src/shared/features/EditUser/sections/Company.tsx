import { FC, ChangeEventHandler } from 'react';
import { Card, Col } from 'antd';

import Input from '../../../components/Input/Input';
import { User } from '../../../types/User';

type CompanyProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  data?: User['company'];
};

export const Company: FC<CompanyProps> = ({ onChange, disabled, data }) => {
  return (
    <Col span={8}>
      <Card title="Company">
        <Input
          label="Name"
          onChange={onChange}
          value={data?.name}
          disabled={disabled}
          name="name"
        />

        <Input
          label="Business Service"
          onChange={onChange}
          value={data?.bs}
          disabled={disabled}
          name="bs"
        />

        <Input
          label="Catch Phrase"
          onChange={onChange}
          value={data?.catchPhrase}
          disabled={disabled}
          name="catchPhrase"
        />
      </Card>
    </Col>
  );
};
