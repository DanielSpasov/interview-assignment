import { ReactNode } from 'react';

import { Filter, SelectValueType } from './features/types';

export type Column<T> = {
  title: string;
  key: string;
  dataIndex: string;
  render?: (
    updateFn: (
      id: number,
      update: Partial<Record<keyof T, SelectValueType>>
    ) => void
  ) => (value: SelectValueType, record: T) => ReactNode;
};

export type TableProps<T> = {
  fetchFn: () => Promise<{ data: T[] }>;
  columns: Column<T>[];
  filters?: Filter<T>[];
};
