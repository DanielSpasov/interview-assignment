import {
  UndoOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined
} from '@ant-design/icons';
import { FC, memo } from 'react';
import { Button } from 'antd';

type FormControlsProps = {
  disableSubmit: boolean;
  disableRevert: boolean;
  onRevert: () => void;
  onSubmit: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
};

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

      <Button
        type="default"
        icon={<UndoOutlined />}
        onClick={onRevert}
        disabled={disableRevert}
      >
        Revert
      </Button>
      <Button
        type="primary"
        onClick={onSubmit}
        disabled={disableSubmit}
        icon={<CheckOutlined />}
      >
        Submit
      </Button>
    </div>
  );
};

export default memo(FormControls);
