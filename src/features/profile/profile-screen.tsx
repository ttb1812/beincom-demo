import React, { memo, useCallback, useMemo } from 'react';
import {
  Box,
  Container,
  Section,
  Button,
  Drawer,
  Text,
} from '../../common/components';
import { ProfileInformation } from './components';
import { ITheme, logger, scaledSize, useAppTheme } from '../../common/utils';
import useProfileScreen from './use-profile-screen';
import { FlatList, StyleSheet } from 'react-native';
import { IMainMenu } from './types';

const ProfileScreen = () => {
  const {
    mainMenuConfig,
    onPressItem,
    drawerLanguageVisible,
    setdrawerLanguageVisible,
  } = useProfileScreen();
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const _renderItem = useCallback(
    (data: IMainMenu) => {
      return (
        <Section.Container title={data.sectionName}>
          <FlatList
            data={data.item}
            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              return (
                <Section.Item
                  key={item.key}
                  icon={item.icon}
                  title={item.title}
                  subTitle={item.subTitle}
                  showIconRight={item?.showIconRight}
                  onPress={() => onPressItem(item.key)}
                />
              );
            }}
            ItemSeparatorComponent={() => (
              <Box height={scaledSize.moderateScale(16)} />
            )}
          />
        </Section.Container>
      );
    },
    [onPressItem],
  );

  return (
    <Container>
      <Box padding={scaledSize.moderateScale(22)} flex>
        <FlatList
          data={mainMenuConfig}
          ListHeaderComponent={
            <Box paddingBottom={scaledSize.moderateScale(28)} safeAreaTop>
              <ProfileInformation
                onPress={() => {
                  logger.log('ProfileInformation =>>>>>>');
                }}
              />
            </Box>
          }
          keyExtractor={item => item.sectionId.toString()}
          renderItem={({ item }) => _renderItem(item)}
          ItemSeparatorComponent={() => (
            <Box height={scaledSize.moderateScale(24)} />
          )}
          ListFooterComponent={
            <Box paddingTop={scaledSize.moderateScale(24)}>
              <Button
                text="Sign Out"
                onPress={() => {
                  logger.log('Sign out =>>>>>');
                }}
                styleTxt={styles.signOutText}
              />
            </Box>
          }
        />
      </Box>

      <Drawer
        title="Language"
        visible={drawerLanguageVisible}
        onClose={() => {
          setdrawerLanguageVisible(false);
        }}
      >
        <Box>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
          <Text>ground</Text>
        </Box>
      </Drawer>
    </Container>
  );
};

export default memo(ProfileScreen);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    signOutText: {
      fontWeight: '400',
      fontSize: scaledSize.moderateScale(20),
    },
  });
