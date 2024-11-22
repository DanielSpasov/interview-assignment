import { Table, Checkbox } from 'antd';
import { FC, memo } from 'react';

import { Task } from '../../../shared/types/Task';

export type TasksTableProps = {
  tasks: Task[];
  handleTaskChange: (id: number) => void;
  loading: boolean;
};

const TasksTable: FC<TasksTableProps> = ({
  tasks,
  handleTaskChange,
  loading
}) => {
  return (
    <Table
      dataSource={tasks}
      columns={[
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
          render: (isCompleted, record) => (
            <Checkbox
              checked={isCompleted}
              onChange={() => handleTaskChange(record.id)}
            />
          )
        }
      ]}
      loading={loading}
      rowKey="id"
      pagination={false}
    />
  );
};

export default memo(TasksTable);
