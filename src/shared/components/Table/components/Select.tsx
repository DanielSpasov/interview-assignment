import { Select as AntSelect } from 'antd';
import { FC, memo } from 'react';

import { Option, SelectValueType } from '../types';

type SelectProps = {
  placeholder?: string;
  options?: Option[];
  value: SelectValueType;
  onChange: (value: SelectValueType) => void;
};

const Select: FC<SelectProps> = ({
  placeholder,
  options = [],
  value,
  onChange
}) => {
  return (
    <AntSelect
      placeholder={placeholder}
      onChange={onChange}
      style={{ width: 200, marginRight: 16 }}
      value={value}
      options={options}
    />
  );
};

export default memo(Select);
