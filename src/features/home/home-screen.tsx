import React, { memo } from 'react';
import { Box, Text, Container } from '../../common/components';
import { StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <Container style={styles.container}>
      <Box>
        <Text>HomeScreen</Text>
      </Box>
    </Container>
  );
};

export default memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
