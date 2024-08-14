import { Checkbox as NBCheckBox } from 'native-base';
import React, { memo } from 'react';

interface ICheckBoxProps {
  isChecked?: boolean;
  indeterminate?: boolean;
  onToggle?: (newValue: boolean) => void;
  underlayColor?: string;
  uncheckedColor?: string;
}

const CheckBox = (props: ICheckBoxProps) => {
  const { onToggle, isChecked = true } = props;
  return (
    <NBCheckBox
      borderRadius="full"
      isChecked={isChecked}
      value=""
      onChange={onToggle}
    />
  );
};

export default memo(CheckBox);
