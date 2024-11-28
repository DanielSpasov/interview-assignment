import { ReactNode } from 'react';

import { Dispatch, SetStateAction } from 'react';

import { FILTER_TYPE, COMPONENT_TYPE } from '../../utils/constants';

export type FilterType = keyof typeof FILTER_TYPE;
type ComponentType = keyof typeof COMPONENT_TYPE;

export type SelectValueType = string | boolean | undefined;

export type Option = {
  label: string;
  value: SelectValueType;
  key: string;
};

export type Filter<T> = {
  key: keyof T;
  type: FilterType;
  component: ComponentType;
  placeholder?: string;
  options?: Option[];
};

export type FiltersObj<T> = Partial<
  Record<keyof T, { value: SelectValueType; type: FilterType }>
>;

export type FiltersProps<T> = {
  config: Filter<T>[];
  filters: FiltersObj<T>;
  setFilters: Dispatch<SetStateAction<FiltersObj<T>>>;
  onClearAll: () => void;
};

export type Column<T> = {
  title: string;
  key: keyof T;
  dataIndex: keyof T;
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
