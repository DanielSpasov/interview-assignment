import { Filter } from '../../shared/components/Table/types';
import { Task } from '../../shared/types/Task';

export const filters: Filter<Task>[] = [
  {
    type: 'INCLUSION',
    component: 'INPUT',
    placeholder: 'Filter by title',
    key: 'title'
  },
  {
    type: 'BOOLEAN',
    component: 'SELECT',
    placeholder: 'Filter by Completion Status',
    key: 'completed',
    options: [
      {
        key: 'all',
        label: 'All',
        value: ''
      },
      {
        key: 'completed',
        label: 'Completed',
        value: true
      },
      {
        key: 'not_completed',
        label: 'Not Completed',
        value: false
      }
    ]
  },
  {
    type: 'EXACT',
    component: 'INPUT',
    placeholder: 'Filter by User ID',
    key: 'userId'
  }
];
