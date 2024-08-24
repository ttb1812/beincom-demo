import React, { memo, useCallback } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-screen-helper';
import { Box, Header, IconButton, PopupManager } from '../../common/components';
import { scaledSize, translate, useAppTheme } from '../../common/utils';
import { TaskGroups, TodayTask } from './components';

const HomeScreen = () => {
  const theme = useAppTheme();

  const featureDevelop = () => {
    PopupManager.instance?.show({
      title: translate('featureDevelopmemt'),
      message: '',
      confirmButton: {
        text: translate('ok'),
      },
    });
  };

  const _renderBottomSpace = useCallback(() => {
    return <Box style={styles.bottomSpace} />;
  }, []);

  return (
    <>
      <Header
        title={translate('home.title')}
        showBackButton={false}
        rightButtonComponent={
          <IconButton
            svg={theme.icons.notificationBold}
            onPress={featureDevelop}
          />
        }
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.animatedContainer}
        scrollEventThrottle={16}
      >
        <TodayTask />
        <TaskGroups onPressGroupItem={featureDevelop} />
        {_renderBottomSpace()}
      </Animated.ScrollView>
    </>
  );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingTop: scaledSize.moderateScale(22),
    paddingHorizontal: 0,
  },
  bottomSpace: {
    height: getBottomSpace() || scaledSize.moderateScale(22),
  },
  animatedContainer: {
    width: scaledSize.deviceWidth,
  },
});
