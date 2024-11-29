import axios from 'axios';

import { PageLayout, Table } from '../../shared/components';
import { Task } from '../../shared/types/Task';

import { columns } from './columns';
import { filters } from './filters';

const Tasks = () => {
  return (
    <PageLayout title="Tasks">
      <Table<Task>
        fetchFn={() => axios.get('https://jsonplaceholder.typicode.com/todos')}
        columns={columns}
        filters={filters}
      />
    </PageLayout>
  );
};

export default Tasks;
