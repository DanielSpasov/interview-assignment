import { Checkbox } from 'antd';
import { Task } from '../../../../shared/types/Task';

export const getColumns = (handleTaskChange: (id: number) => void) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
    key: 'userId'
  },
  {
    title: 'Completed',
    dataIndex: 'completed',
    key: 'completed',
    render: (isCompleted: boolean, record: Task) => (
      <Checkbox
        checked={isCompleted}
        onChange={() => handleTaskChange(record.id)}
      />
    )
  }
];
