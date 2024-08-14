import moment from 'moment';
import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Content,
  DatePicker,
  Drawer,
  Footer,
  Header,
  SelectionGroup,
  TextInput,
} from '../../common/components';
import { IItemList } from '../../common/components/drawer/components/single-drawer';
import { NavigationService, scaledSize, ScreenName } from '../../common/utils';
import { getCategories } from '../manage-category/manage-category-slice';
import { ITaskItem } from '../manage-category/types';

const AddTaskScreen = () => {
  const PADDING_TOP = scaledSize.moderateScale(24);
  const categories = useSelector(getCategories);
  const formattedCategories = categories.map(item => {
    return {
      id: item.id,
      title: item.categoryName,
    };
  }) as IItemList[];
  const [categorySelected, setcategorySelected] = useState<IItemList>(
    formattedCategories[0],
  );
  const [categoriesmModalVisible, setCategoriesDrawerVisible] = useState(false);

  const [task, setTask] = useState<ITaskItem>({
    id: ''.uuidv4(),
    taskName: '',
    decription: '',
    startDate: '',
    endDate: '',
    categoryId: formattedCategories[0]?.id,
  });

  const onOpen = () => {
    setCategoriesDrawerVisible(true);
  };

  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: 'Add Task',
      }}
    >
      <Content scrollEnabled>
        <SelectionGroup
          title="Category"
          onPress={onOpen}
          subTitle={categorySelected.title}
        />
        <Box paddingTop={PADDING_TOP}>
          <TextInput
            title="Task Name"
            value={task.taskName}
            onChangeText={text => {
              setTask({ ...task, taskName: text });
            }}
          />
        </Box>
        <Box paddingTop={PADDING_TOP}>
          <TextInput
            title="Description"
            multiline
            value={task.decription}
            onChangeText={text => {
              setTask({ ...task, decription: text });
            }}
          />
        </Box>
        <Box paddingTop={PADDING_TOP}>
          <DatePicker
            title="Start Date"
            onDateChange={date => {
              setTask({
                ...task,
                startDate: moment(date).toString(),
              });
            }}
          />
        </Box>
        <Box paddingTop={PADDING_TOP}>
          <DatePicker
            title="End Date"
            onDateChange={date => {
              setTask({ ...task, endDate: moment(date).toString() });
            }}
          />
        </Box>
      </Content>
      <Footer>
        <Button
          text="Add"
          onPress={() => {
            NavigationService.navigate(ScreenName.tasksScreen);
          }}
        />
      </Footer>

      <Drawer.SingleDrawer
        title="Categories"
        data={formattedCategories}
        visible={categoriesmModalVisible}
        itemSelected={categorySelected}
        onSelect={item => {
          setcategorySelected(item as any);
          setTask({ ...task, categoryId: item?.id });
        }}
        onClose={() => {
          setCategoriesDrawerVisible(false);
        }}
      />
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
