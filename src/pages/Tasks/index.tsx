import { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

import PageLayout from '../../components/core/PageLayout';

import TasksTable from './composables/TasksTable';
import Pagination from './composables/Pagination';
import Filters from './composables/Filters';

import { Task } from '../../types/Task';

const PAGE_SIZE = 10;

const Tasks = () => {
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [taskUpdates, setTaskUpdates] = useState<Map<number, boolean>>(
    new Map()
  );
  const [tasks, setTasks] = useState<Task[]>([]);

  // Filters
  const [completion, setCompletion] = useState('all');
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/todos'
        );
        setTasks(res.data);
      } catch (err) {
        message.error('Failed to fetch Tasks.');
        if (err instanceof AxiosError) {
          setError(err.message);
          return;
        }
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredTasks = useMemo(() => {
    const taskList = tasks.map(task => ({
      ...task,
      completed: taskUpdates.get(task.id) ?? task.completed
    }));

    return taskList.filter(task => {
      const matchesTitle = title
        ? task.title.toLowerCase().includes(title.toLowerCase())
        : true;
      const matchesUserId = userId ? task.userId.toString() === userId : true;
      const matchesCompletion =
        completion === 'completed'
          ? task.completed
          : completion === 'not_completed'
          ? !task.completed
          : true;
      return matchesTitle && matchesUserId && matchesCompletion;
    });
  }, [title, userId, completion, taskUpdates, tasks]);

  const currentTasks = useMemo(
    () =>
      filteredTasks.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
      ),
    [filteredTasks, currentPage]
  );

  const handleTaskChange = useCallback((id: number) => {
    setTaskUpdates(prev => {
      const updated = new Map(prev);
      const currentValue = updated.get(id);
      updated.set(id, currentValue === undefined ? true : !currentValue);
      return updated;
    });
  }, []);

  return (
    <PageLayout title="Tasks" loading={loading} error={error}>
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
        loading={loading}
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
