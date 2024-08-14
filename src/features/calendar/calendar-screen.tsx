import React, { memo, useCallback, useMemo, useState } from 'react';
import {
  Animated,
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
import { scaledSize, useAppTheme } from '../../common/utils';
import { TaskItem } from './components';
import useCalendarScreen from './use-calendar-screen';

const CalendarScreen = () => {
  const {
    selectedDate,
    setSelectedDate,
    monthSelected,
    setMonthSelected,
    tasks,
    filterOption,
    handleFilterOption,
    filters,
    featureDevelop,
  } = useCalendarScreen();
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(), []);
  const [headerHeight] = useState(new Animated.Value(1));

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
    if (scrollY > scaledSize.verticalScale(128)) {
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
  };

  const headerHeightInterpolate = headerHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [CALENDAR_CAROUSEL_HEIGHT, Number(CALENDAR_HEIGHT)],
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
              onPress={featureDevelop}
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
            <CalendarCarousel
              selectedDate={selectedDate}
              setSelectedDate={date => {
                setSelectedDate(date);
                setMonthSelected(date);
              }}
            />
          </Animated.View>

          <Animated.View
            style={{
              opacity: calendarWidgetOpacityInterpolate,
            }}
          >
            <CalendarWidget
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              monthSelected={monthSelected}
              setMonthSelected={setMonthSelected}
            />
          </Animated.View>
        </Animated.View>

        <Box paddingVertical={scaledSize.moderateScale(28)}>
          <FilterCarousel
            filterOption={filterOption}
            setFilterOption={handleFilterOption}
            filters={filters}
          />
        </Box>

        <Box paddingHorizontal={scaledSize.moderateScale(22)}>
          <Animated.FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => {
              return <TaskItem onPress={featureDevelop} />;
            }}
            ItemSeparatorComponent={() => (
              <Box height={scaledSize.moderateScale(16)} />
            )}
            ListFooterComponent={_renderBottomSpace}
            onScroll={handleScroll}
            scrollEventThrottle={20}
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
        android: scaledSize.verticalScale(630),
        ios: scaledSize.verticalScale(660),
      }),
    },
  });
