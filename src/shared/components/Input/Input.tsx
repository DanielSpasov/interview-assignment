import { InputProps as AntInputProps } from 'antd/lib/input';
import { Form, Input as AntInput } from 'antd';
import { ChangeEvent, FC, memo } from 'react';

export type InputProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & AntInputProps;

const Input: FC<InputProps> = ({ onChange, label, ...rest }) => {
  return (
    <Form.Item label={label} required={rest?.required}>
      <AntInput onChange={onChange} {...rest} />
    </Form.Item>
  );
};

export default memo(Input);
