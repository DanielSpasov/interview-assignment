import { TextAreaProps as AntTextareaProps } from 'antd/lib/input';
import TextArea from 'antd/es/input/TextArea';
import { FC, memo, ChangeEvent } from 'react';
import { Form } from 'antd';

export type TextareaProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
} & AntTextareaProps;

const Textarea: FC<TextareaProps> = ({ onChange, label, ...rest }) => {
  return (
    <Form.Item label={label}>
      <TextArea onChange={onChange} {...rest} />
    </Form.Item>
  );
};

export default memo(Textarea);
