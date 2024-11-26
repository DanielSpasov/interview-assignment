import { ChangeEventHandler, FC, memo } from 'react';
import { Input as AntInput } from 'antd';

type InputProps = {
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Input: FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <AntInput.Search
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      style={{ width: 200, marginRight: 16 }}
    />
  );
};

export default memo(Input);
