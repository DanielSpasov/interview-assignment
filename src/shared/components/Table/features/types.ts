import { Dispatch, SetStateAction } from 'react';

import { TYPE, COMPONENT_TYPE } from '../utils';

export type FilterType = keyof typeof TYPE;
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
