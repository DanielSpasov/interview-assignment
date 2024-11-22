import { useState } from 'react';

import PageLayout from '../../../shared/components/PageLayout';
import TasksTable from '../components/Table';
import Pagination from '../components/Pagination';
import Filters from '../components/Filters';

import { STATUS, useTasks } from '../hooks/useTasks';

const Tasks = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [completion, setCompletion] = useState('all');
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');

  const { error, status, currentTasks, filteredTasks, handleTaskChange } =
    useTasks({
      filters: {
        completion,
        userId,
        title
      },
      pagination: {
        currentPage
      }
    });

  return (
    <PageLayout title="Tasks" loading={status === STATUS.LOADING} error={error}>
      <Filters
        title={title}
        userId={userId}
        completion={completion}
        setTitle={setTitle}
        setUserId={setUserId}
        setCompletion={setCompletion}
        setCurrentPage={setCurrentPage}
      />

      <TasksTable
        handleTaskChange={handleTaskChange}
        loading={status === STATUS.LOADING}
        tasks={currentTasks}
      />

      <Pagination
        current={currentPage}
        onChange={setCurrentPage}
        total={filteredTasks.length}
      />
    </PageLayout>
  );
};

export default Tasks;
