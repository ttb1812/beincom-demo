import { StyleSheet } from 'react-native';
import React, { memo, useMemo } from 'react';
import { IButtonProps } from './types';
import { Button as NBButton } from 'native-base';
import { Text } from '../text';
import { ITheme, scaledSize, useAppTheme } from '../../utils';

const Button = (props: IButtonProps) => {
  const theme = useAppTheme();
  const {
    text,
    textColor = theme.palette.neutral6,
    onPress,
    textVariants = 'title1',
    style,
    styleTxt,
  } = props;

  const styles = useMemo(() => makeStyles(theme), [theme]);
  return (
    <NBButton style={[styles.container, style]} onPress={onPress}>
      <Text variants={textVariants} color={textColor} style={styleTxt}>
        {text}
      </Text>
    </NBButton>
  );
};

export default memo(Button);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: scaledSize.verticalScale(52),
      borderRadius: scaledSize.moderateScale(16),
      backgroundColor: theme.palette.primary1,
    },
  });
