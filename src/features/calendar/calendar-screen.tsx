import React, { memo } from 'react';
import {
  Container,
  Content,
  Header,
  IconButton,
  Text,
} from '../../common/components';
import { StyleSheet } from 'react-native';
import { NavigationService, ScreenName, useAppTheme } from '../../common/utils';

const CalendarScreen = () => {
  const theme = useAppTheme();
  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: 'Calendar',
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
        <Text>CalendarScreen</Text>
      </Content>
    </Container>
  );
};

export default memo(CalendarScreen);

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
