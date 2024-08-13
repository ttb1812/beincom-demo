import { Box } from 'native-base';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  IconButton,
  SearchBar,
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
      <Box>
        <SearchBar />
      </Box>
    </Container>
  );
};

export default memo(TasksScreen);

const styles = StyleSheet.create({
  container: {},
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
