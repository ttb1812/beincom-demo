// NOTE: This hook requires an Animated view to be used!!!
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { scaledSize } from '../utils';

const useHiddenBottomTabOnScroll = () => {
  const prevScrollY = useRef(0);
  const navigation = useNavigation();
  const [animatedValue] = useState(new Animated.Value(0));

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    const scrollY = contentOffset.y;
    if (
      scrollY > 0 &&
      scrollY > prevScrollY.current &&
      contentSize.height > scaledSize.deviceHeight
    ) {
      // scroll down
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 80,
        useNativeDriver: false,
      }).start();
    } else {
      if (!isBottom) {
        // scroll up
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 80,
          useNativeDriver: false,
        }).start();
      }
    }
    prevScrollY.current = scrollY;
  };

  useEffect(() => {
    navigation?.setOptions({
      tabBarStyle: {
        transform: [{ translateY: translateY }],
        opacity: opacity,
        position: 'absolute',
      },
    });
  }, [navigation, opacity, translateY]);

  return {
    onScroll: handleScroll,
  };
};

export default useHiddenBottomTabOnScroll;
