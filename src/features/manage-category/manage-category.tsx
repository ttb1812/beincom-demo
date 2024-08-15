import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Header,
  IconCategory,
  PopupManager,
  Text,
} from '../../common/components';
import { ITheme, scaledSize, useAppTheme } from '../../common/utils';
import { CategoryItem } from './components';
import { getCategories } from './manage-category-slice';

const ManageCategoryScreen = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const categories = useSelector(getCategories);
  const featureDevelop = useCallback(() => {
    PopupManager.instance?.show({
      title: 'Feature development!',
      message: '',
      confirmButton: {
        text: 'Ok',
      },
    });
  }, []);
  const _renderFooter = useCallback(() => {
    return (
      <Pressable onPress={featureDevelop}>
        <Box style={styles.footer}>
          <Box>
            <IconCategory
              icon={theme.icons.calendar}
              backgroundColor={theme.palette.neutral5}
            />
          </Box>
          <Box marginLeft={scaledSize.moderateScale(16)}>
            <Text style={styles.createNewText} variants="body2">
              Create New
            </Text>
          </Box>
        </Box>
      </Pressable>
    );
  }, [
    featureDevelop,
    styles.createNewText,
    styles.footer,
    theme.icons.calendar,
    theme.palette.neutral5,
  ]);
  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: 'Manage Categories',
        showBackButton: true,
      }}
    >
      <Box flex>
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <CategoryItem data={item} onPressCategoryItem={featureDevelop} />
            );
          }}
          ListFooterComponent={_renderFooter()}
        />
      </Box>
    </Container>
  );
};

export default memo(ManageCategoryScreen);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {},
    content: {
      backgroundColor: 'red',
    },
    footer: {
      height: scaledSize.verticalScale(52),
      flexDirection: 'row',
      alignItems: 'center',
    },
    createNewText: {
      color: theme.palette.neutral2,
    },
    contentContainerStyle: {
      paddingHorizontal: scaledSize.moderateScale(22),
    },
  });
