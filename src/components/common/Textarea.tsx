import { TextAreaProps as AntTextareaProps } from 'antd/lib/input';
import { ChangeEvent, FC, memo } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Form } from 'antd';

type TextareaProps = {
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
