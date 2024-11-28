import { Checkbox } from 'antd';

import { Column } from '../../shared/components/Table/types';
import { Task } from '../../shared/types/Task';

export const columns: Column<Task>[] = [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id'
  },
  {
    title: 'Title',
    key: 'title',
    dataIndex: 'title'
  },
  {
    title: 'User ID',
    key: 'userId',
    dataIndex: 'userId'
  },
  {
    title: 'Completed',
    key: 'completed',
    dataIndex: 'completed',
    render: handleUpdate => (value, record) =>
      (
        <Checkbox
          checked={Boolean(value)}
          onChange={e =>
            handleUpdate(record.id, { completed: e.target.checked })
          }
        />
      )
  }
];
