import _ from 'lodash';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { ITheme, scaledSize, translate, useAppTheme } from '../../utils';
import { Box } from '../box';
import { SvgFromString } from '../svg-from-string';
import { Text } from '../text';

const SearchBar = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const GAP = scaledSize.scale(16);
  const PADDING_HORIZONTAL = scaledSize.scale(44);
  const SEARCH_WIDTH = scaledSize.deviceWidth - PADDING_HORIZONTAL;
  const CANCEL_WIDTH = scaledSize.scale(60);
  const textInputRef = useRef<TextInput>(null);
  const [isFocused, setFocused] = useState(false);
  const [searchWidth] = useState(new Animated.Value(1));
  const [searchQuery, setSearchQuery] = useState<string>('');

  const onFocus = useCallback(() => {
    Animated.timing(searchWidth, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    setFocused(true);
    textInputRef.current?.focus();
  }, [searchWidth]);

  const onBlur = useCallback(() => {
    Animated.timing(searchWidth, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
    setFocused(false);
    textInputRef.current?.blur();
  }, [searchWidth]);

  const searchWidthInterpolate = searchWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [SEARCH_WIDTH - CANCEL_WIDTH - GAP, SEARCH_WIDTH],
  });

  const buttonOpacityInterpolate = searchWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const searchBarStyle = useMemo(() => {
    if (isFocused) {
      return {
        borderColor: theme.palette.primary1,
      };
    } else {
      return {};
    }
  }, [isFocused, theme.palette.primary1]);

  const _renderSearchIcon = useCallback(() => {
    if (isFocused) {
      return <SvgFromString svg={theme.icons.searchBold} />;
    } else {
      return <SvgFromString svg={theme.icons.search} />;
    }
  }, [isFocused, theme.icons.search, theme.icons.searchBold]);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const _clearTextBtn = useCallback(() => {
    if (!_.isEmpty(searchQuery)) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => setSearchQuery('')}
        >
          <SvgFromString svg={theme.icons.cancelCircle} />
        </TouchableHighlight>
      );
    }
  }, [searchQuery, theme.icons.cancelCircle]);

  return (
    <Box style={styles.container}>
      <Pressable onPress={onFocus}>
        <Animated.View
          style={[
            styles.searchContainer,
            searchBarStyle,
            { width: searchWidthInterpolate },
          ]}
        >
          {_renderSearchIcon()}
          <Box flex marginHorizontal={scaledSize.moderateScale(8)}>
            <TextInput
              ref={textInputRef}
              onFocus={onFocus}
              placeholder={translate('search')}
              onBlur={onBlur}
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={styles.textInput}
            />
          </Box>
          {_clearTextBtn()}
        </Animated.View>
      </Pressable>
      <Pressable onPress={onBlur}>
        <Animated.View
          style={[
            styles.cancelContainer,
            { opacity: buttonOpacityInterpolate },
          ]}
        >
          <Text
            color={theme.palette.primary1}
            variants="body2"
            style={styles.cancelText}
          >
            {translate('cancel')}
          </Text>
        </Animated.View>
      </Pressable>
    </Box>
  );
};

export default memo(SearchBar);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: scaledSize.moderateScale(22),
    },
    searchContainer: {
      borderColor: theme.palette.neutral6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scaledSize.moderateScale(16),
      paddingVertical: scaledSize.moderateScale(10),
      borderWidth: 1,
      borderRadius: Number.MAX_SAFE_INTEGER,
      backgroundColor: theme.palette.neutral6,
    },
    cancelContainer: {
      width: scaledSize.scale(60),
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: scaledSize.scale(16),
    },
    cancelText: {
      fontWeight: '500',
    },
    textInput: {
      padding: 0,
    },
  });
