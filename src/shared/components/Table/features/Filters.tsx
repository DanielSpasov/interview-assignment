import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { memo } from 'react';

import { COMPONENT_TYPE } from '../utils';
import { FiltersProps } from '../types';

import Select from '../components/Select';
import Input from '../components/Input';

function Filters<T>({
  config,
  filters,
  setFilters,
  onClearAll
}: FiltersProps<T>) {
  return (
    <div style={{ marginBottom: 16 }}>
      {config.map(filter => {
        switch (filter.component) {
          case COMPONENT_TYPE.INPUT:
            return (
              <Input
                key={filter.key as string}
                placeholder={filter.placeholder}
                onChange={e =>
                  setFilters(prev => ({
                    ...prev,
                    [filter.key]: {
                      value: e.target.value,
                      type: prev[filter.key]?.type
                    }
                  }))
                }
                value={filters[filter.key]?.value as string}
              />
            );
          case COMPONENT_TYPE.SELECT:
            return (
              <Select
                key={filter.key as string}
                options={filter.options}
                placeholder={filter.placeholder}
                value={filters[filter.key]?.value}
                onChange={value => {
                  setFilters(prev => ({
                    ...prev,
                    [filter.key]: {
                      value: value,
                      type: prev[filter.key]?.type
                    }
                  }));
                }}
              />
            );
        }
      })}

      <Button onClick={onClearAll} icon={<CloseOutlined />} danger>
        Clear all
      </Button>
    </div>
  );
}

export default memo(Filters) as typeof Filters;
