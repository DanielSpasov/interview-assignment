import { Form, Input as AntInput } from 'antd';
import { FC, memo } from 'react';

import { InputProps } from './types';

const Input: FC<InputProps> = ({ onChange, label, ...rest }) => {
  return (
    <Form.Item label={label} required={rest?.required}>
      <AntInput onChange={onChange} {...rest} />
    </Form.Item>
  );
};

export default memo(Input);
