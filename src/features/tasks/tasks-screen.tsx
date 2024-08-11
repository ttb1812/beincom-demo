import React, { memo } from 'react';
import { Box, Container, Text } from '../../common/components';

const TasksScreen = () => {
  return (
    <Container>
      <Box flex center>
        <Text>TasksScreen</Text>
      </Box>
    </Container>
  );
};

export default memo(TasksScreen);
