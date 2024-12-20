import { Filter, FiltersObj, FilterType, SelectValueType } from './types';

export const filtersToObj = <T>(config: Filter<T>[]): FiltersObj<T> =>
  config.reduce(
    (acc, curr) => ({ ...acc, [curr.key]: { value: null, type: curr.type } }),
    {} as FiltersObj<T>
  );

export const filter: Record<
  FilterType,
  (a: SelectValueType, b: SelectValueType) => boolean
> = {
  EXACT: (a, b) => {
    if (!a || !b) return true;
    return String(b).toLowerCase() === String(a).toLowerCase();
  },
  BOOLEAN: (a, b) => {
    if (typeof a !== 'boolean' || typeof b !== 'boolean') return true;
    return a === b;
  },
  INCLUSION: (a, b) => {
    if (!a || !b || typeof a !== 'string' || typeof b !== 'string') return true;
    return String(b).toLowerCase().includes(a.toLowerCase());
  }
};
