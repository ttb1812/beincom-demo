import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scaledSize } from '../../utils';
import { IContent } from './types';

const Content = (props: IContent) => {
  const {
    scrollEnabled = false,
    style,
    contentContainerStyle,
    children,
    ...restProps
  } = props;
  const styles = useMemo(() => makeStyles(), []);
  return (
    <KeyboardAwareScrollView
      scrollEnabled={scrollEnabled}
      style={[styles.container, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      enableAutomaticScroll={false}
      showsVerticalScrollIndicator={false}
      {...restProps}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default memo(Content);

const makeStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: scaledSize.deviceWidth,
    },
    content: {
      padding: scaledSize.moderateScale(22),
    },
  });
