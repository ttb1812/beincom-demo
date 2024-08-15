import moment from 'moment';
import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Content,
  DatePicker,
  Drawer,
  Header,
  SelectionGroup,
  TextInput,
} from '../../common/components';
import { IItemList } from '../../common/components/drawer/components/single-drawer';
import {
  NavigationService,
  scaledSize,
  ScreenName,
  ternaryOperator,
  translate,
} from '../../common/utils';
import {
  CategoriesAction,
  getCategories,
} from '../manage-category/manage-category-slice';
import { ITaskItem, STATUS_ENUM } from '../manage-category/types';

const AddTaskScreen = () => {
  const dispatch = useDispatch();
  const PADDING_TOP = scaledSize.moderateScale(24);
  const categories = useSelector(getCategories);
  const formattedCategories = categories.map(item => {
    return {
      id: item.id,
      title: translate(item.categoryName),
      subTitle: item.iconType,
    };
  }) as IItemList[];
  const [categorySelected, setcategorySelected] = useState<IItemList>(
    formattedCategories[0],
  );
  const [categoriesModalVisible, setCategoriesDrawerVisible] = useState(false);
  const [task, setTask] = useState<ITaskItem>({
    id: ''.uuidv4(),
    taskName: '',
    description: '',
    startDate: '',
    endDate: '',
    status: STATUS_ENUM.TO_DO,
    iconTypeCategory: categories[0].iconType,
    categoryId: categories[0].id,
  });
  const [startCheck, setStartCheck] = useState(false);

  const onOpen = () => {
    setCategoriesDrawerVisible(true);
  };

  const addTask = useCallback(() => {
    const updatedCategories = categories.map((cat: any) => {
      if (cat.id === categorySelected.id) {
        return {
          ...cat,
          tasks: [...cat?.tasks, task],
        };
      } else {
        return cat;
      }
    });
    dispatch(CategoriesAction.setCategories({ categories: updatedCategories }));
    NavigationService.navigate(ScreenName.tasksScreen);
  }, [categories, categorySelected.id, dispatch, task]);

  const handlePressAdd = useCallback(() => {
    if (!task.taskName || !task.description) {
      setStartCheck(true);
    } else {
      setStartCheck(false);
      addTask();
    }
  }, [addTask, task.description, task.taskName]);

  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: translate('addTask.title'),
      }}
    >
      <Content scrollEnabled>
        <SelectionGroup
          title={translate('addTask.category')}
          onPress={onOpen}
          subTitle={categorySelected.title}
          iconType={categorySelected.subTitle || ''}
        />
        <Box paddingTop={PADDING_TOP}>
          <TextInput
            status={ternaryOperator(
              startCheck && !task.taskName,
              'error',
              'normal',
            )}
            title={translate('addTask.taskName')}
            value={task.taskName}
            onChangeText={text => {
              setTask({ ...task, taskName: text });
            }}
          />
        </Box>
        <Box paddingTop={PADDING_TOP}>
          <TextInput
            status={ternaryOperator(
              startCheck && !task.description,
              'error',
              'normal',
            )}
            title={translate('addTask.description')}
            multiline
            value={task.description}
            onChangeText={text => {
              setTask({ ...task, description: text });
            }}
          />
        </Box>
        <Box paddingTop={PADDING_TOP}>
          <DatePicker
            title={translate('addTask.startDate')}
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
            title={translate('addTask.endDate')}
            onDateChange={date => {
              setTask({ ...task, endDate: moment(date).toString() });
            }}
          />
        </Box>

        <Box paddingTop={PADDING_TOP}>
          <Button text={translate('add')} onPress={handlePressAdd} />
        </Box>
      </Content>

      <Drawer.SingleDrawer
        title={translate('addTask.categories')}
        data={formattedCategories}
        visible={categoriesModalVisible}
        itemSelected={categorySelected}
        onSelect={item => {
          setcategorySelected(item as any);
          setTask({
            ...task,
            categoryId: item?.id,
            iconTypeCategory: item?.subTitle as any,
          });
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
