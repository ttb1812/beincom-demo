import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Box, Text } from '../../../common/components';
import { ITheme, scaledSize, useAppTheme } from '../../../common/utils';

const MOCK_DATA = new Array(6);

const InProgress = () => {
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
        <Text variants="title2">In Progress</Text>
        {_renderBadge()}
      </Box>
    );
  }, [_renderBadge, styles.titleContainer]);

  const _renderProgressItem = useCallback(() => {
    return (
      <Box style={styles.progressItemContainer}>
        <Text>sdkfsjdh</Text>
      </Box>
    );
  }, [styles.progressItemContainer]);

  return (
    <Box paddingTop={scaledSize.moderateScale(28)}>
      {_renderTitle()}
      <Box paddingTop={scaledSize.moderateScale(24)}>
        <FlatList
          data={MOCK_DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => _renderProgressItem()}
          horizontal
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={() => (
            <Box width={scaledSize.moderateScale(22)} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
};

export default memo(InProgress);

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
    progressItemContainer: {
      width: scaledSize.scale(300),
      height: scaledSize.verticalScale(160),
      backgroundColor: 'red',
      borderRadius: scaledSize.moderateScale(24),
      padding: scaledSize.moderateScale(22),
    },
  });
