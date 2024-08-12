import { StyleSheet, ViewProps } from 'react-native';
import React, { memo, useMemo } from 'react';
import { Box } from '../box';
import { ITheme, scaledSize, useAppTheme } from '../../../common/utils';

const ProgressBar = (props: { current: number; goal: number }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles({ ...theme }), [theme]);
  const { current, goal } = props;

  const progressWidth = useMemo(() => {
    const percent = (current * 100) / goal;
    if (percent >= 100) {
      return {
        width: '100%',
      } as ViewProps;
    } else if (percent > 0 && percent < 2) {
      return {
        width: scaledSize.scale(8),
      } as ViewProps;
    } else {
      return { width: percent + '%' } as ViewProps;
    }
  }, [current, goal]);

  return (
    <Box
      height={scaledSize.verticalScale(8)}
      style={styles.container}
      radius="full"
    >
      <Box style={[styles.progress, progressWidth]} radius="full" />
    </Box>
  );
};

export default memo(ProgressBar);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: { backgroundColor: theme.palette.primary6 },
    progress: {
      position: 'absolute',
      height: '100%',
      backgroundColor: theme.palette.primary1,
      zIndex: Number.MAX_SAFE_INTEGER,
    },
  });
