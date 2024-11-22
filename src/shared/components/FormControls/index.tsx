import {
  UndoOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined
} from '@ant-design/icons';
import { FC, memo } from 'react';
import { Button } from 'antd';

import { FormControlsProps } from './types';

const FormControls: FC<FormControlsProps> = ({
  onCancel,
  onRevert,
  onSubmit,
  onEdit,
  disableSubmit,
  disableRevert
}) => {
  return (
    <div
      style={{
        justifyContent: 'end',
        display: 'flex',
        gap: '.5em'
      }}
    >
      {onEdit && (
        <Button type="default" icon={<EditOutlined />} onClick={onEdit}>
          Edit
        </Button>
      )}

      {onCancel && (
        <Button
          type="default"
          danger
          icon={<CloseOutlined />}
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}

      {onRevert && (
        <Button
          type="default"
          icon={<UndoOutlined />}
          onClick={onRevert}
          disabled={disableRevert}
        >
          Revert
        </Button>
      )}

      {onSubmit && (
        <Button
          type="primary"
          onClick={onSubmit}
          disabled={disableSubmit}
          icon={<CheckOutlined />}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default memo(FormControls);
