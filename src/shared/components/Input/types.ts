import { InputProps as AntInputProps } from 'antd/lib/input';
import { ChangeEvent } from 'react';

export type InputProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & AntInputProps;
