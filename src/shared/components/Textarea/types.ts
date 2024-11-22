import { TextAreaProps as AntTextareaProps } from 'antd/lib/input';
import { ChangeEvent } from 'react';

export type TextareaProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
} & AntTextareaProps;
