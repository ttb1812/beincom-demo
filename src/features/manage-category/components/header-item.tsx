import { StyleSheet } from 'react-native';
import React, { memo, useMemo } from 'react';
import { ITheme, scaledSize, useAppTheme } from '../../../common/utils';
import { Box, Text } from '../../../common/components';
import Color from 'color';

const HeaderItem = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  return (
    <Box style={styles.container}>
      <Text variants="caption2" style={styles.labelTxt}>
        Categories display in taskspage
      </Text>
    </Box>
  );
};

export default memo(HeaderItem);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: scaledSize.verticalScale(52),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color(theme.palette.semantic2).alpha(0.2).rgb().string(),
    },
    labelTxt: {
      fontWeight: '400',
      color: theme.palette.neutral2,
    },
  });
