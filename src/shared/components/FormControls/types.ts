export type FormControlsProps = {
  disableSubmit: boolean;
  disableRevert: boolean;
  onRevert?: () => void;
  onSubmit?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
};
