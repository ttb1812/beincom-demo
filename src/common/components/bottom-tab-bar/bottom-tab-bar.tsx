import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { memo, useCallback, useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  NavigationService,
  scaledSize,
  ScreenName,
  StackNavigation,
  useAppTheme,
} from '../../utils';
import { Box } from '../box';
import { Image } from '../image';
import CustomTabButton from './custom-tab-button';

const BottomTabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(), []);

  const _renderOverlayView = useCallback(() => {
    return (
      <Box style={[styles.container, styles.overlayContainer]} absolute row>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const label = options?.title;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (route?.name === ScreenName.addTaskBtn) {
              NavigationService.navigate(ScreenName.addTaskScreen);
            } else {
              if (!isFocused && !event.defaultPrevented) {
                (navigation as unknown as StackNavigation)?.navigate<any>({
                  name: route.name,
                  merge: true,
                });
              }
            }
          };

          const onLongPress = () => {
            if (route?.name === ScreenName.addTaskBtn) {
              NavigationService.navigate(ScreenName.addTaskScreen);
            } else {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            }
          };

          return (
            <CustomTabButton
              key={index}
              onPress={onPress}
              onLongPress={onLongPress}
              label={label}
              isFocused={isFocused}
              routeName={route.name}
            />
          );
        })}
      </Box>
    );
  }, [
    descriptors,
    navigation,
    state.index,
    state.routes,
    styles.container,
    styles.overlayContainer,
  ]);

  return (
    <Box style={[styles.container, styles.overlay]}>
      <Image
        source={theme.images.bottomTabBar}
        style={[styles.container]}
        showSkeletonLoading={false}
      />
      {_renderOverlayView()}
    </Box>
  );
};

export default memo(BottomTabBar);

const makeStyles = () =>
  StyleSheet.create({
    container: {
      width: scaledSize.deviceWidth,
      height: scaledSize.verticalScale(85),
    },
    overlay: {
      position: 'absolute',
      bottom: Platform.select({
        ios: 0,
        android: scaledSize.moderateScale(-12),
      }),
    },
    overlayContainer: {
      paddingHorizontal: scaledSize.moderateScale(22),
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
