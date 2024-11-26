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
    >
      {options.length &&
        options?.map(option => (
          <AntSelect.Option key={option.key} value={option.value}>
            {option.label}
          </AntSelect.Option>
        ))}
    </AntSelect>
  );
};

export default memo(Select);
