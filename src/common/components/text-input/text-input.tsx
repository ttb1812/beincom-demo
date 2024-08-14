import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import React, { memo, useMemo } from 'react';
import { Box } from '../box';
import { Text } from '../text';
import { ITheme, scaledSize, useAppTheme } from '../../utils';

interface ITextInputProps {
  title?: string;
  multiline?: boolean;
}

const TextInput = (props: ITextInputProps) => {
  const { title, multiline } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  return (
    <Box style={styles.container}>
      <Box>
        <Text variants="caption2" style={styles.title}>
          {title}
        </Text>
      </Box>

      <RNTextInput
        placeholder="Do something..."
        style={[theme.styles.body3, styles.textInput]}
        multiline={multiline}
      />
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
  });
