import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Box, Container, Header, PopupManager } from '../../common/components';
import { ITheme, scaledSize, translate, useAppTheme } from '../../common/utils';
import { CategoryItem } from './components';
import { getCategories } from './manage-category-slice';

const ManageCategoryScreen = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const categories = useSelector(getCategories);
  const featureDevelop = useCallback(() => {
    PopupManager.instance?.show({
      title: translate('featureDevelopmemt'),
      message: '',
      confirmButton: {
        text: translate('ok'),
      },
    });
  }, []);

  return (
    <Container
      style={styles.container}
      headerComponent={Header}
      headerProps={{
        title: translate('manageCategories.title'),
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
