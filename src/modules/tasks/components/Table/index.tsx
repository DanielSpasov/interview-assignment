import { Table as AntTable } from 'antd';
import { FC, memo } from 'react';

import { Task } from '../../../../shared/types/Task';
import { getColumns } from './columns';

export type TasksTableProps = {
  tasks: Task[];
  handleTaskChange: (id: number) => void;
  loading: boolean;
};

const Table: FC<TasksTableProps> = ({ tasks, handleTaskChange, loading }) => {
  return (
    <AntTable
      dataSource={tasks}
      columns={getColumns(handleTaskChange)}
      loading={loading}
      rowKey="id"
      pagination={false}
    />
  );
};

export default memo(Table);
