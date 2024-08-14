import { Checkbox as NBCheckBox } from 'native-base';
import React, { memo } from 'react';
import { Pressable } from 'react-native';

interface ICheckBoxProps {
  isChecked?: boolean;
  indeterminate?: boolean;
  onToggle?: () => void;
  underlayColor?: string;
  uncheckedColor?: string;
}

const CheckBox = (props: ICheckBoxProps) => {
  const { onToggle, isChecked = true } = props;
  return (
    <Pressable onPress={onToggle}>
      <NBCheckBox borderRadius="full" isChecked={isChecked} value="" />
    </Pressable>
  );
};

export default memo(CheckBox);
