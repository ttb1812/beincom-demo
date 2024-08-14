import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet, Pressable } from 'react-native';
import { Box, IconCategory, PieChart, Text } from '../../../common/components';
import { ITheme, scaledSize, useAppTheme } from '../../../common/utils';

const MOCK_DATA = new Array(6);

const TaskGroups = () => {
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const _renderBadge = useCallback(() => {
    return (
      <Box style={styles.badgeContainer}>
        <Text variants="body3" color={theme.palette.primary1}>
          6
        </Text>
      </Box>
    );
  }, [styles.badgeContainer, theme.palette.primary1]);

  const _renderTitle = useCallback(() => {
    return (
      <Box style={styles.titleContainer}>
        <Text variants="title2">Task Groups</Text>
        {_renderBadge()}
      </Box>
    );
  }, [_renderBadge, styles.titleContainer]);

  const _renderGroupItem = useCallback(() => {
    return (
      <Pressable>
        <Box style={styles.groupItemContainer}>
          <Box rowAlignCenter>
            <IconCategory
              icon={theme.icons.calendar}
              backgroundColor={theme.palette.neutral5}
            />
            <Box marginLeft={scaledSize.moderateScale(16)}>
              <Text variants="body1">Office Project</Text>
              <Text variants="body3" color={theme.palette.neutral2}>
                23 tasks
              </Text>
            </Box>
          </Box>
          <Box>
            <PieChart
              radius={scaledSize.scale(26)}
              innerRadius={scaledSize.scale(20)}
              innerCircleColor={theme.palette.neutral6}
            />
          </Box>
        </Box>
      </Pressable>
    );
  }, [
    styles.groupItemContainer,
    theme.icons.calendar,
    theme.palette.neutral2,
    theme.palette.neutral5,
    theme.palette.neutral6,
  ]);

  return (
    <Box paddingTop={scaledSize.moderateScale(28)}>
      {_renderTitle()}
      <Box paddingTop={scaledSize.moderateScale(24)}>
        <FlatList
          data={MOCK_DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => _renderGroupItem()}
          bounces={false}
          scrollEnabled={false}
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={() => (
            <Box height={scaledSize.moderateScale(22)} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
};

export default memo(TaskGroups);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scaledSize.moderateScale(22),
    },
    badgeContainer: {
      width: scaledSize.moderateScale(24),
      height: scaledSize.moderateScale(24),
      backgroundColor: theme.palette.primary6,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Number.MAX_SAFE_INTEGER,
      marginLeft: scaledSize.moderateScale(16),
    },
    contentContainerStyle: {
      paddingHorizontal: scaledSize.moderateScale(22),
    },
    groupItemContainer: {
      borderRadius: scaledSize.moderateScale(24),
      padding: scaledSize.moderateScale(22),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.neutral6,
    },
  });
