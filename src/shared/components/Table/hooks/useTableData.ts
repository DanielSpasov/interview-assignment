import { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';

import { FiltersObj, FilterType, SelectValueType } from '../types';
import { STATUS, PAGE_SIZE } from '../../../utils/constants';
import { PaginationProps } from '../components/Pagination';
import { filter } from '../../../utils/filters';
import { TableProps } from '../types';

type UseTableDataProps<T> = {
  fetchFn: TableProps<T>['fetchFn'];
  pagination: Omit<PaginationProps, 'total'>;
  filters: FiltersObj<T>;
};

export const useTableData = <T extends { id: number }>({
  fetchFn,
  filters,
  pagination
}: UseTableDataProps<T>) => {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(STATUS.LOADING);
  const [data, setData] = useState<T[]>([]);

  const [dataUpdates, setDataUpdates] = useState(new Map());

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        setStatus(STATUS.LOADING);
        const { data } = await fetchFn();
        setData(data);
      } catch (err) {
        setError(
          err instanceof AxiosError
            ? err.message
            : 'Failed to fetch table data.'
        );
        setStatus(STATUS.ERROR);
      } finally {
        setStatus(STATUS.SUCCESS);
      }
    })();
  }, [fetchFn]);

  const allData = useMemo(
    () =>
      data.map(item => {
        if (!dataUpdates.has(item.id)) return item;
        return { ...item, ...dataUpdates.get(item.id) };
      }),
    [data, dataUpdates]
  );

  const filteredData = useMemo(
    () =>
      allData.filter(item =>
        (
          Object.entries(filters) as [
            keyof T,
            { type: FilterType; value: SelectValueType }
          ][]
        )
          .map(([key, { type, value }]) =>
            filter[type](value, item[key] as SelectValueType)
          )
          .every(Boolean)
      ),
    [filters, allData]
  );

  const currentData = useMemo(
    () =>
      filteredData.slice(
        (pagination.current - 1) * PAGE_SIZE,
        pagination.current * PAGE_SIZE
      ),
    [pagination, filteredData]
  );

  const handleUpdate = useCallback(
    (id: number, update: Partial<Record<keyof T, SelectValueType>>) => {
      setDataUpdates(prev => new Map(prev.set(id, update)));
    },
    []
  );

  return {
    total: filteredData.length,
    currentData,
    handleUpdate,
    status,
    error
  };
};
