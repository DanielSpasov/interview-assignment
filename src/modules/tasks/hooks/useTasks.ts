import { useCallback, useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

import { Task } from '../../../shared/types/Task';

const PAGE_SIZE = 10;

export const STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

export const useTasks = ({
  filters,
  pagination
}: {
  filters: Record<string, string>;
  pagination: { currentPage: number };
}) => {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(STATUS.LOADING);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskUpdates, setTaskUpdates] = useState<Map<number, boolean>>(
    new Map()
  );

  useEffect(() => {
    (async () => {
      try {
        setStatus(STATUS.LOADING);
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
        setStatus(STATUS.ERROR);
      } finally {
        setStatus(STATUS.SUCCESS);
      }
    })();
  }, []);

  const filteredTasks = useMemo(() => {
    const taskList = tasks.map(task => ({
      ...task,
      completed: taskUpdates.get(task.id) ?? task.completed
    }));

    return taskList.filter(task => {
      const matchesTitle = filters.title
        ? task.title.toLowerCase().includes(filters.title.toLowerCase())
        : true;
      const matchesUserId = filters.userId
        ? task.userId.toString() === filters.userId
        : true;
      const matchesCompletion =
        filters.completion === 'completed'
          ? task.completed
          : filters.completion === 'not_completed'
          ? !task.completed
          : true;
      return matchesTitle && matchesUserId && matchesCompletion;
    });
  }, [filters, taskUpdates, tasks]);

  const currentTasks = useMemo(
    () =>
      filteredTasks.slice(
        (pagination.currentPage - 1) * PAGE_SIZE,
        pagination.currentPage * PAGE_SIZE
      ),
    [filteredTasks, pagination]
  );

  const handleTaskChange = useCallback((id: number) => {
    setTaskUpdates(prev => {
      const updated = new Map(prev);
      const currentValue = updated.get(id);
      updated.set(id, currentValue === undefined ? true : !currentValue);
      return updated;
    });
  }, []);

  return {
    error,
    status,
    currentTasks,
    filteredTasks,
    handleTaskChange
  };
};
