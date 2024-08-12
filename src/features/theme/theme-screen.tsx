import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Header } from '../../common/components';

const ThemeScreen = () => {
  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: 'Theme',
        showBackButton: true,
      }}
    >
      <Content contentContainerStyle={styles.content}>
        <Text>ThemeScreen</Text>
      </Content>
    </Container>
  );
};

export default memo(ThemeScreen);

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
