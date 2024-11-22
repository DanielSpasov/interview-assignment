import { CloseOutlined } from '@ant-design/icons';
import { Input, Select, Button } from 'antd';
import { FC, memo } from 'react';

import { FiltersProps } from './types';

const { Option } = Select;
const { Search } = Input;

const Filters: FC<FiltersProps> = ({
  title,
  setTitle,
  userId,
  setUserId,
  completion,
  setCompletion,
  setCurrentPage
}) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Search
        placeholder="Filter by title"
        onChange={e => {
          setCurrentPage(1);
          setTitle(e.target.value);
        }}
        style={{ width: 200, marginRight: 16 }}
        value={title}
      />

      <Select
        placeholder="Filter by Completion Status"
        onChange={value => {
          setCurrentPage(1);
          setCompletion(value);
        }}
        style={{ width: 200, marginRight: 16 }}
        value={completion}
      >
        <Option value="all">All</Option>
        <Option value="completed">Completed</Option>
        <Option value="not_completed">Not Completed</Option>
      </Select>

      <Search
        placeholder="Filter by User ID"
        onChange={e => {
          setCurrentPage(1);
          setUserId(e.target.value);
        }}
        style={{ width: 200, marginRight: 16 }}
        value={userId}
      />

      <Button
        onClick={() => {
          setTitle('');
          setUserId('');
          setCompletion('all');
          setCurrentPage(1);
        }}
        icon={<CloseOutlined />}
        danger
      >
        Clear all
      </Button>
    </div>
  );
};

export default memo(Filters);
