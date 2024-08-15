import { Checkbox as NBCheckBox } from 'native-base';
import React, { memo } from 'react';
import { Pressable } from 'react-native';
import { ICheckBoxProps } from './types';

const CheckBox = (props: ICheckBoxProps) => {
  const { onToggle, isChecked = true } = props;
  return (
    <Pressable onPress={onToggle}>
      <NBCheckBox borderRadius="full" isChecked={isChecked} value="" />
    </Pressable>
  );
};

export default memo(CheckBox);
