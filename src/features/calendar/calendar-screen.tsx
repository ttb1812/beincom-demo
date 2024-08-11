import React, { memo } from 'react';
import { Box, Container, Text } from '../../common/components';

const CalendarScreen = () => {
  return (
    <Container>
      <Box flex center>
        <Text>CalendarScreen</Text>
      </Box>
    </Container>
  );
};

export default memo(CalendarScreen);
