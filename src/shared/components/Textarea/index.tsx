import { FC, memo } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Form } from 'antd';

import { TextareaProps } from './types';

const Textarea: FC<TextareaProps> = ({ onChange, label, ...rest }) => {
  return (
    <Form.Item label={label}>
      <TextArea onChange={onChange} {...rest} />
    </Form.Item>
  );
};

export default memo(Textarea);
