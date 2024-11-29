import { Alert, Table as AntTable } from 'antd';
import { useState } from 'react';

import Filters from './features/Filters';

import { useTableData } from './hooks/useTableData';
import Pagination from './components/Pagination';
import { STATUS } from '../../utils/constants';
import { filtersToObj } from './utils';
import { TableProps } from './types';

const Table = <T extends { id: number }>({
  fetchFn,
  columns,
  filters: filtersConfig = []
}: TableProps<T>) => {
  const [filters, setFilters] = useState(filtersToObj(filtersConfig));
  const [page, setPage] = useState(1);

  const { status, currentData, total, error, handleUpdate } = useTableData<T>({
    fetchFn,
    filters,
    pagination: {
      current: page,
      onChange: setPage
    }
  });

  if (error) {
    return (
      <Alert
        message="Failed to fetch table data."
        description={error}
        type="error"
      />
    );
  }

  return (
    <div>
      <Filters<T>
        config={filtersConfig}
        filters={filters}
        setFilters={filters => {
          setFilters(filters);
          setPage(1);
        }}
        onClearAll={() => {
          setFilters(filtersToObj(filtersConfig));
          setPage(1);
        }}
      />

      <AntTable
        dataSource={currentData}
        columns={columns.map(col => ({
          ...col,
          key: col.key as string,
          dataIndex: col.dataIndex as string,
          render: col?.render?.(handleUpdate)
        }))}
        loading={status === STATUS.LOADING}
        rowKey="id"
        pagination={false}
      />

      <Pagination current={page} onChange={setPage} total={total} />
    </div>
  );
};

export default Table;
