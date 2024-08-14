import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import {
  Container,
  Content,
  Header,
  SelectionGroup,
  TextInput,
  DatePicker,
  Footer,
  Button,
  Box,
} from '../../common/components';
import { NavigationService, scaledSize, ScreenName } from '../../common/utils';

const AddTaskScreen = () => {
  const PADDING_TOP = scaledSize.moderateScale(24);
  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: 'Add Task',
      }}
    >
      <Content scrollEnabled>
        <SelectionGroup />
        <Box paddingTop={PADDING_TOP}>
          <TextInput title="Task Name" />
        </Box>
        <Box paddingTop={PADDING_TOP}>
          <TextInput title="Description" multiline />
        </Box>
        <Box paddingTop={PADDING_TOP}>
          <DatePicker title="Start Date" />
        </Box>
        <Box paddingTop={PADDING_TOP}>
          <DatePicker title="End Date" />
        </Box>
      </Content>
      <Footer>
        <Button
          text="Add"
          onPress={() => NavigationService.navigate(ScreenName.tasksScreen)}
        />
      </Footer>
    </Container>
  );
};

export default memo(AddTaskScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
