import { StyleSheet, Pressable } from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { Box } from '../box';
import { Text } from '../text';
import {
  scaledSize,
  ScreenName,
  ternaryOperator,
  useAppTheme,
} from '../../utils';
import { SvgFromString } from '../svg-from-string';

interface ICustomTabButtonProps {
  onPress?: () => void;
  onLongPress?: () => void;
  label?: string;
  isFocused: boolean;
  routeName?: string;
}

const CustomTabButton = (props: ICustomTabButtonProps) => {
  const { onPress, onLongPress, label, isFocused, routeName } = props;
  const ICONS_SIZE = scaledSize.moderateScale(24);
  const ADD_TASK_ICON = scaledSize.moderateScale(80);
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(), []);

  const _renderTabIcon = useCallback(() => {
    switch (routeName) {
      case ScreenName.homeScreen:
        return (
          <SvgFromString
            svg={ternaryOperator(
              isFocused,
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
              isFocused,
              theme.icons.calendarBold,
              theme.icons.calendar,
            )}
            width={ICONS_SIZE}
            height={ICONS_SIZE}
          />
        );
      case ScreenName.addTaskScreen:
        return (
          <SvgFromString
            svg={theme.icons.addCircle}
            width={ADD_TASK_ICON}
            height={ADD_TASK_ICON}
          />
        );
      case ScreenName.tasksScreen:
        return (
          <SvgFromString
            svg={ternaryOperator(
              isFocused,
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
              isFocused,
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
    isFocused,
    routeName,
    theme.icons.addCircle,
    theme.icons.calendar,
    theme.icons.calendarBold,
    theme.icons.home,
    theme.icons.homeBold,
    theme.icons.profile,
    theme.icons.profileBold,
    theme.icons.tasks,
    theme.icons.tasksBold,
  ]);

  const _renderLabel = useCallback(() => {
    if (routeName !== ScreenName.addTaskScreen && isFocused) {
      return (
        <Box>
          <Text variants="caption2" color={theme.palette.primary1}>
            {label}
          </Text>
        </Box>
      );
    }
  }, [isFocused, label, routeName, theme.palette.primary1]);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.conatiner,
        routeName === ScreenName.addTaskScreen && styles.addTaskBtn,
      ]}
    >
      <Box>{_renderTabIcon()}</Box>
      {_renderLabel()}
    </Pressable>
  );
};

export default memo(CustomTabButton);

const makeStyles = () =>
  StyleSheet.create({
    conatiner: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addTaskBtn: {
      top: scaledSize.moderateScale(-34),
    },
  });
