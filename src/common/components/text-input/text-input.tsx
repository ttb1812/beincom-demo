import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { Box } from '../box';
import { Text } from '../text';
import { ITheme, scaledSize, translate, useAppTheme } from '../../utils';
import Color from 'color';

interface ITextInputProps extends TextInputProps {
  title?: string;
  multiline?: boolean;
  status?: 'normal' | 'error';
}

const TextInput = (props: ITextInputProps) => {
  const { title, multiline, value, onChangeText, status = 'normal' } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const inputOutlineStyle: any = [styles.container];

  const getInputOutlineStyle = useCallback(() => {
    switch (status) {
      case 'error':
        inputOutlineStyle.push(styles.outlineStyleError);
        break;
      default:
        break;
    }
  }, [inputOutlineStyle, status, styles.outlineStyleError]);

  const _renderTextInput = useCallback(() => {
    getInputOutlineStyle();
    return (
      <RNTextInput
        placeholder={translate('dosomething')}
        value={value}
        onChangeText={onChangeText}
        style={[theme.styles.body3, styles.textInput]}
        multiline={multiline}
      />
    );
  }, [
    getInputOutlineStyle,
    multiline,
    onChangeText,
    styles.textInput,
    theme.styles.body3,
    value,
  ]);

  return (
    <Box style={inputOutlineStyle}>
      <Box>
        <Text variants="caption2" style={styles.title}>
          {title}
        </Text>
      </Box>
      {_renderTextInput()}
    </Box>
  );
};

export default memo(TextInput);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.palette.neutral6,
      borderRadius: scaledSize.moderateScale(16),
      padding: scaledSize.moderateScale(16),
    },
    title: {
      fontWeight: '400',
      color: theme.palette.neutral2,
    },
    textInput: {
      fontWeight: '400',
      paddingTop: scaledSize.moderateScale(8),
      paddingBottom: 0,
    },
    outlineStyleError: {
      borderWidth: 1,
      borderColor: theme.palette.semantic1,
      backgroundColor: Color(theme.palette.semantic1)
        .alpha(0.08)
        .rgb()
        .toString(),
    },
  });
