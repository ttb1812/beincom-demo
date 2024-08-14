import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { Box, Button, Drawer, Section } from '../../common/components';
import { logger, scaledSize } from '../../common/utils';
import { ProfileInformation } from './components';
import { IMainMenu } from './types';
import useProfileScreen from './use-profile-screen';

const ProfileScreen = () => {
  const {
    mainMenuConfig,
    onPressItem,
    drawerLanguageVisible,
    setDrawerLanguageVisible,
  } = useProfileScreen();
  const styles = useMemo(() => makeStyles(), []);

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
    <>
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
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <Box paddingTop={scaledSize.moderateScale(24)}>
              <Button
                text="Sign Out"
                onPress={() => {
                  logger.log('Sign out =>>>>>');
                }}
                styleTxt={styles.signOutText}
              />
              <Box style={styles.bottomSpace} />
            </Box>
          }
        />
      </Box>
      <Drawer.SingleDrawer
        title="Language"
        visible={drawerLanguageVisible}
        onClose={() => {
          setDrawerLanguageVisible(false);
        }}
      />
    </>
  );
};

export default memo(ProfileScreen);

const makeStyles = () =>
  StyleSheet.create({
    signOutText: {
      fontWeight: '400',
      fontSize: scaledSize.moderateScale(20),
    },
    bottomSpace: {
      height: Platform.select({
        ios: scaledSize.moderateScale(100),
        android: scaledSize.moderateScale(92),
      }),
    },
  });
