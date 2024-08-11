import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { Container, Content, Header, Text } from '../../common/components';

const NotificationsScreen = () => {
  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: 'Notifications',
      }}
    >
      <Content contentContainerStyle={styles.content}>
        <Text>NotificationsScreen</Text>
      </Content>
    </Container>
  );
};

export default memo(NotificationsScreen);

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
