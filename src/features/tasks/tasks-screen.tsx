import React, { memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  GroupItem,
  Header,
  IconButton,
  PopupManager,
  SearchBar,
} from '../../common/components';
import { scaledSize, translate, useAppTheme } from '../../common/utils';
import { getCategories } from '../manage-category/manage-category-slice';

const TasksScreen = () => {
  const theme = useAppTheme();
  const categories = useSelector(getCategories);
  const featureDevelop = () => {
    PopupManager.instance?.show({
      title: translate('featureDevelopmemt'),
      message: '',
      confirmButton: {
        text: translate('ok'),
      },
    });
  };
  return (
    <Container
      headerComponent={Header}
      headerProps={{
        title: translate('tasks.title'),
        showBackButton: false,
        rightButtonComponent: (
          <IconButton
            svg={theme.icons.notificationBold}
            onPress={featureDevelop}
          />
        ),
      }}
    >
      <SearchBar />
      <Box style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<Box height={scaledSize.moderateScale(16)} />}
          renderItem={({ item }) => {
            return <GroupItem data={item} onPress={featureDevelop} />;
          }}
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={() => (
            <Box height={scaledSize.moderateScale(16)} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </Container>
  );
};

export default memo(TasksScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scaledSize.moderateScale(16),
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
