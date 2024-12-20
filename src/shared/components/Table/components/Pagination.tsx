import { FC, memo, SetStateAction, Dispatch } from 'react';
import { Pagination as AntPagination } from 'antd';

export type PaginationProps = {
  current: number;
  total: number;
  onChange: Dispatch<SetStateAction<number>>;
};

const Pagination: FC<PaginationProps> = ({ current, total, onChange }) => {
  return (
    <AntPagination
      current={current}
      pageSize={10}
      total={total}
      onChange={onChange}
      showSizeChanger={false}
      style={{ marginTop: 16 }}
    />
  );
};

export default memo(Pagination);
