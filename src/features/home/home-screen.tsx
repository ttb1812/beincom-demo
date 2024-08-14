import React, { memo, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  Container,
  Content,
  Header,
  IconButton,
  PopupManager,
} from '../../common/components';
import { scaledSize, useAppTheme } from '../../common/utils';
import { InProgress, TaskGroups, TodayTask } from './components';

const HomeScreen = () => {
  const theme = useAppTheme();
  const featureDevelop = () => {
    PopupManager.instance?.show({
      title: 'Feature development!',
      message: '',
      confirmButton: {
        text: 'Ok',
      },
    });
  };
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
            onPress={featureDevelop}
          />
        ),
      }}
    >
      <Content contentContainerStyle={styles.content} scrollEnabled>
        <TodayTask />
        <InProgress onPressProgressItem={featureDevelop} />
        <TaskGroups onPressGroupItem={featureDevelop} />
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
    height: scaledSize.verticalScale(100),
  },
});
