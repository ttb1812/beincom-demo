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

const TasksScreen = () => {
  const theme = useAppTheme();
  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: 'Tasks',
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
        <Text>TasksScreen</Text>
      </Content>
    </Container>
  );
};

export default memo(TasksScreen);

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
