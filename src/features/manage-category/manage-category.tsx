import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Content, Header, Container } from '../../common/components';

const ManageCategoryScreen = () => {
  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: 'Manage Categories',
        showBackButton: true,
      }}
    >
      <Content contentContainerStyle={styles.content}>
        <Text>Manage Categories</Text>
      </Content>
    </Container>
  );
};

export default memo(ManageCategoryScreen);

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
