import React, { memo, useCallback, useMemo } from 'react';
import { Box } from '../box';
import { SvgFromString } from '../svg-from-string';
import { StyleSheet } from 'react-native';
import { scaledSize, useAppTheme } from '../../utils';
import Color from 'color';
import { IIconCategoryProps } from './types';

const IconCategory = (props: IIconCategoryProps) => {
  const { type } = props;
  const theme = useAppTheme();

  const backgroundColor = useMemo(() => {
    switch (type) {
      case 'jobs':
        return Color(theme.palette.semantic2).alpha(0.2).rgb().string();
      case 'personal':
        return Color(theme.palette.semantic3).alpha(0.2).rgb().string();
      case 'favorite':
        return Color(theme.palette.semantic4).alpha(0.2).rgb().string();
      case 'birthday':
        return Color(theme.palette.semantic5).alpha(0.2).rgb().string();
      default:
        return Color(theme.palette.primary4).alpha(0.2).rgb().string();
    }
  }, [
    theme.palette.primary4,
    theme.palette.semantic2,
    theme.palette.semantic3,
    theme.palette.semantic4,
    theme.palette.semantic5,
    type,
  ]);

  const svg = useCallback(() => {
    switch (type) {
      case 'jobs':
        return theme.icons.jobs;
      case 'personal':
        return theme.icons.personal;
      case 'favorite':
        return theme.icons.favorite;
      case 'birthday':
        return theme.icons.birthday;
      default:
        return theme.icons.calendar;
    }
  }, [
    theme.icons.birthday,
    theme.icons.calendar,
    theme.icons.favorite,
    theme.icons.jobs,
    theme.icons.personal,
    type,
  ]);
  return (
    <Box style={[styles.conainer, { backgroundColor: backgroundColor }]}>
      <Box style={styles.contentConainer}>
        <SvgFromString svg={svg()} />
      </Box>
    </Box>
  );
};

export default memo(IconCategory);
const styles = StyleSheet.create({
  conainer: {
    borderRadius: scaledSize.moderateScale(12),
  },
  contentConainer: {
    padding: scaledSize.moderateScale(8),
  },
});
