import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Header,
  IconButton,
  Text,
} from '../../common/components';
import { NavigationService, ScreenName, useAppTheme } from '../../common/utils';

const HomeScreen = () => {
  const theme = useAppTheme();
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
      <Content contentContainerStyle={styles.content}>
        <Text>HomeScreen</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
