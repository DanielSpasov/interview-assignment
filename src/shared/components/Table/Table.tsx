import { Table as AntTable } from 'antd';
import { memo, useState } from 'react';

import Filters from './features/Filters';

import { useTableData } from './hooks/useTableData';
import { filtersToObj } from '../../utils/filters';
import Pagination from './components/Pagination';
import { STATUS } from '../../utils/constants';
import { TableProps } from './types';

function Table<T extends { id: number }>({
  fetchFn,
  columns,
  filters: filtersConfig = []
}: TableProps<T>) {
  const [filters, setFilters] = useState(filtersToObj(filtersConfig));
  const [page, setPage] = useState(1);

  const { status, currentData, filteredData, updateData } = useTableData<T>({
    fetchFn,
    filters,
    pagination: {
      current: page,
      onChange: setPage
    }
  });

  return (
    <article>
      <Filters<T>
        config={filtersConfig}
        filters={filters}
        setFilters={setFilters}
        onClearAll={() => {
          setFilters(filtersToObj(filtersConfig));
          setPage(1);
        }}
      />

      <AntTable
        dataSource={currentData}
        columns={columns.map(col => ({
          ...col,
          render: col?.render?.(updateData)
        }))}
        loading={status === STATUS.LOADING}
        rowKey="id"
        pagination={false}
      />

      <Pagination
        current={page}
        onChange={setPage}
        total={filteredData.length}
      />
    </article>
  );
}

export default memo(Table) as typeof Table;
