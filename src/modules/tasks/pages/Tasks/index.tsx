import axios from 'axios';

import PageLayout from '../../../../shared/components/PageLayout';

import Table from '../../../../shared/components/Table';
import { Task } from '../../../../shared/types/Task';
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
