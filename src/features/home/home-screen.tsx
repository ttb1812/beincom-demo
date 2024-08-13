import React, { memo, useCallback } from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Header,
  IconButton,
  Box,
} from '../../common/components';
import {
  NavigationService,
  scaledSize,
  ScreenName,
  useAppTheme,
} from '../../common/utils';
import { InProgress, TaskGroups, TodayTask } from './components';

const HomeScreen = () => {
  const theme = useAppTheme();
  const _renderBottomSpace = useCallback(() => {
    return <Box style={styles.bottomSpace} />;
  }, []);
  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: 'Home',
        showBackButton: false,
        rightButtonComponent: (
          <IconButton
            svg={theme.icons.notificationBold}
            onPress={() => {
              NavigationService.navigate(ScreenName.notificationsScreen);
            }}
          />
        ),
      }}
    >
      <Content contentContainerStyle={styles.content} scrollEnabled>
        <TodayTask />
        <InProgress />
        <TaskGroups />
        {_renderBottomSpace()}
      </Content>
    </Container>
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
    height: Platform.select({
      android: scaledSize.verticalScale(48),
      ios: scaledSize.verticalScale(100),
    }),
  },
});
