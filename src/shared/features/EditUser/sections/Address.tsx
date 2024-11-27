import { ChangeEventHandler, FC } from 'react';
import { Card, Col } from 'antd';

import Input from '../../../components/Input/Input';
import { User } from '../../../types/User';

type AddressProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  data?: User['address'];
};

export const Address: FC<AddressProps> = ({ onChange, disabled, data }) => {
  return (
    <Col span={8}>
      <Card title="Address">
        <Input
          label="City"
          onChange={onChange}
          value={data?.city}
          disabled={disabled}
          name="city"
          required
        />

        <Input
          label="Street"
          onChange={onChange}
          value={data?.street}
          disabled={disabled}
          name="street"
          required
        />

        <Input
          label="Suite"
          onChange={onChange}
          value={data?.suite}
          disabled={disabled}
          name="suite"
          required
        />

        <Input
          label="Zipcode"
          onChange={onChange}
          value={data?.zipcode}
          disabled={disabled}
          name="zipcode"
        />
      </Card>
    </Col>
  );
};
