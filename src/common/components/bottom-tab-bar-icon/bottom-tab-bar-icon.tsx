import { StyleSheet, ViewStyle } from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { BottomTabBarIconProps } from './types';
import {
  scaledSize,
  ScreenName,
  ternaryOperator,
  useAppTheme,
} from '../../utils';
import { SvgFromString } from '../svg-from-string';
import { Box } from '../box';
import { Text } from '../text';
import Color from 'color';

const BottomTabBarIcon = (props: BottomTabBarIconProps) => {
  const { tabKey, label, tabProps } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(), []);
  const forcused = useMemo(() => tabProps.focused, [tabProps.focused]);
  const ICONS_SIZE = scaledSize.moderateScale(24);
  const ADD_TASK_ICON = scaledSize.moderateScale(74);

  const _renderTabIcon = useCallback(() => {
    switch (tabKey) {
      case ScreenName.homeScreen:
        return (
          <SvgFromString
            svg={ternaryOperator(
              forcused,
              theme.icons.homeBold,
              theme.icons.home,
            )}
            width={ICONS_SIZE}
            height={ICONS_SIZE}
          />
        );
      case ScreenName.calendarScreen:
        return (
          <SvgFromString
            svg={ternaryOperator(
              forcused,
              theme.icons.calendarBold,
              theme.icons.calendar,
            )}
            width={ICONS_SIZE}
            height={ICONS_SIZE}
          />
        );
      case ScreenName.addTaskBtn:
        return (
          <Box
            backgroundColor={Color(theme.palette.primary1)
              .alpha(0.36)
              .rgb()
              .toString()}
            center
            width={ADD_TASK_ICON + 12}
            height={ADD_TASK_ICON + 12}
            radius="full"
          >
            <Box
              width={ADD_TASK_ICON}
              height={ADD_TASK_ICON}
              radius="full"
              backgroundColor={theme.palette.primary1}
              center
            >
              <SvgFromString svg={theme.icons.add} width={36} height={36} />
            </Box>
          </Box>
        );
      case ScreenName.tasksScreen:
        return (
          <SvgFromString
            svg={ternaryOperator(
              forcused,
              theme.icons.tasksBold,
              theme.icons.tasks,
            )}
            width={ICONS_SIZE}
            height={ICONS_SIZE}
          />
        );
      case ScreenName.profileScreen:
        return (
          <SvgFromString
            svg={ternaryOperator(
              forcused,
              theme.icons.profileBold,
              theme.icons.profile,
            )}
            width={ICONS_SIZE}
            height={ICONS_SIZE}
          />
        );
      default:
        return (
          <SvgFromString
            svg={theme.icons.home}
            width={ICONS_SIZE}
            height={ICONS_SIZE}
          />
        );
    }
  }, [
    ADD_TASK_ICON,
    ICONS_SIZE,
    forcused,
    tabKey,
    theme.icons.add,
    theme.icons.calendar,
    theme.icons.calendarBold,
    theme.icons.home,
    theme.icons.homeBold,
    theme.icons.profile,
    theme.icons.profileBold,
    theme.icons.tasks,
    theme.icons.tasksBold,
    theme.palette.primary1,
  ]);

  const _renderLabel = useCallback(() => {
    if (tabKey !== ScreenName.addTaskBtn && forcused) {
      return (
        <Box>
          <Text variants="caption2" color={theme.palette.primary1}>
            {label}
          </Text>
        </Box>
      );
    } else {
      return <></>;
    }
  }, [forcused, label, tabKey, theme.palette.primary1]);

  const container = useMemo(() => {
    const buttonStyles = [] as ViewStyle[];
    if (tabKey !== ScreenName.addTaskBtn) {
      buttonStyles.push(styles.baseConstainer);
    }
    return buttonStyles;
  }, [styles.baseConstainer, tabKey]);

  return (
    <Box style={[...container]}>
      {_renderTabIcon()}
      {_renderLabel()}
    </Box>
  );
};

export default memo(BottomTabBarIcon);

const makeStyles = () =>
  StyleSheet.create({
    baseConstainer: {
      top: scaledSize.moderateScale(8),
      width: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
