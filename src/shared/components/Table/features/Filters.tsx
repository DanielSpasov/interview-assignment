import { CloseOutlined } from '@ant-design/icons';
import { memo, useCallback } from 'react';
import { Button } from 'antd';

import { FiltersProps, SelectValueType } from '../types';
import { COMPONENT_TYPE } from '../../../utils/constants';

import Select from '../components/Select';
import Input from '../components/Input';

const Filters = <T extends { id: number }>({
  config,
  filters,
  setFilters,
  onClearAll
}: FiltersProps<T>) => {
  const handleChange = useCallback(
    (key: keyof T, value: SelectValueType) => {
      setFilters(prev => ({
        ...prev,
        [key]: { value, type: prev[key]?.type }
      }));
    },
    [setFilters]
  );

  return (
    <div style={{ marginBottom: 16 }}>
      {config.map(filter => {
        switch (filter.component) {
          case COMPONENT_TYPE.INPUT:
            return (
              <Input
                {...filter}
                key={filter.key as string}
                value={filters[filter.key]?.value as string}
                onChange={e => handleChange(filter.key, e.target.value)}
              />
            );
          case COMPONENT_TYPE.SELECT:
            return (
              <Select
                {...filter}
                key={filter.key as string}
                value={filters[filter.key]?.value}
                onChange={value => handleChange(filter.key, value)}
              />
            );
        }
      })}

      <Button onClick={onClearAll} icon={<CloseOutlined />} danger>
        Clear all
      </Button>
    </div>
  );
};

export default memo(Filters) as typeof Filters;
