import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  Box,
  CalendarCarousel,
  CalendarWidget,
  Container,
  FilterCarousel,
  Header,
  IconButton,
} from '../../common/components';
import {
  NavigationService,
  scaledSize,
  ScreenName,
  useAppTheme,
} from '../../common/utils';
import { TaskItem } from './components';

const CalendarScreen = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(), []);
  const [headerHeight] = useState(new Animated.Value(1));
  const lastScrollY = useRef(0);
  const CALENDAR_HEIGHT = Platform.select({
    ios: scaledSize.verticalScale(360),
    android: scaledSize.verticalScale(400),
  });
  const CALENDAR_CAROUSEL_HEIGHT = scaledSize.verticalScale(108);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollY = contentOffset.y;
    const isAtBottom =
      layoutMeasurement.height + scrollY + 2 >= contentSize.height;

    // scrolling down
    if (scrollY > 0) {
      Animated.timing(headerHeight, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      // scrolling up
      if (!isAtBottom) {
        Animated.timing(headerHeight, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }
    }

    lastScrollY.current = scrollY;
  };

  const headerHeightInterpolate = headerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [CALENDAR_CAROUSEL_HEIGHT, CALENDAR_HEIGHT],
  });

  const calendarCarouselOpacityInterpolate = headerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const calendarCarouselIndexOpacityInterpolate = headerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [Number.MAX_SAFE_INTEGER, 0],
  });

  const calendarWidgetOpacityInterpolate = headerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const _renderBottomSpace = useCallback(() => {
    return <Box style={styles.bottomSpace} />;
  }, [styles.bottomSpace]);

  return (
    <Container>
      <Box zIndex={Number.MAX_SAFE_INTEGER}>
        <Header
          title="Todays Tasks"
          showBackButton={false}
          rightButtonComponent={
            <IconButton
              svg={theme.icons.notificationBold}
              onPress={() => {
                NavigationService.navigate(ScreenName.notificationsScreen);
              }}
            />
          }
        />
      </Box>
      <Box style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            {
              height: headerHeightInterpolate,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.calendarCarouselContainer,
              {
                opacity: calendarCarouselOpacityInterpolate,
                zIndex: calendarCarouselIndexOpacityInterpolate,
              },
            ]}
          >
            <CalendarCarousel />
          </Animated.View>

          <Animated.View
            style={{
              opacity: calendarWidgetOpacityInterpolate,
            }}
          >
            <CalendarWidget />
          </Animated.View>
        </Animated.View>

        <Box paddingVertical={scaledSize.moderateScale(28)}>
          <FilterCarousel />
        </Box>

        <Box paddingHorizontal={scaledSize.moderateScale(22)}>
          <FlatList
            data={new Array(40)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => {
              return <TaskItem />;
            }}
            ItemSeparatorComponent={() => (
              <Box height={scaledSize.moderateScale(16)} />
            )}
            ListFooterComponent={_renderBottomSpace}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default memo(CalendarScreen);

const makeStyles = () =>
  StyleSheet.create({
    container: {},
    header: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarCarouselContainer: {
      position: 'absolute',
    },
    bottomSpace: {
      height: Platform.select({
        android: scaledSize.verticalScale(88),
        ios: scaledSize.verticalScale(660),
      }),
    },
  });
