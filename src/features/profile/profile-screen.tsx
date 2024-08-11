import React, { memo } from 'react';
import { Box, Container, Text } from '../../common/components';

const ProfileScreen = () => {
  return (
    <Container>
      <Box flex center>
        <Text>ProfileScreen</Text>
      </Box>
    </Container>
  );
};

export default memo(ProfileScreen);
