import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { Container, Content, Header, Text } from '../../common/components';

const AddTaskScreen = () => {
  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: 'Add Task',
      }}
    >
      <Content contentContainerStyle={styles.content}>
        <Text>AddTaskScreen</Text>
      </Content>
    </Container>
  );
};

export default memo(AddTaskScreen);

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
