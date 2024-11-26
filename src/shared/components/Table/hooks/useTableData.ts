import { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { message } from 'antd';

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
        setStatus(STATUS.LOADING);
        const { data } = await fetchFn();
        setData(data);
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
  }, [fetchFn]);

  const filteredData = useMemo(() => {
    const allData = data.map(item => {
      if (!dataUpdates.has(item.id)) return item;
      return {
        ...item,
        ...dataUpdates.get(item.id)
      };
    });

    return allData.filter(item =>
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
    );
  }, [filters, dataUpdates, data]);

  const currentData = useMemo(
    () =>
      filteredData.slice(
        (pagination.current - 1) * PAGE_SIZE,
        pagination.current * PAGE_SIZE
      ),
    [filteredData, pagination]
  );

  const updateData = useCallback(
    (id: number, update: Record<string, string | boolean | undefined>) => {
      setDataUpdates(prev => {
        const updated = new Map(prev);
        updated.set(id, update);
        return updated;
      });
    },
    []
  );

  return {
    data,
    currentData,
    filteredData,
    updateData,
    status,
    error
  };
};
