import React, { memo, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ITheme, scaledSize, useAppTheme } from '../../utils';
import { Box } from '../box';
import { SvgFromString } from '../svg-from-string';
import { Text } from '../text';
import { IconCategory } from '../icon-category';

interface ISelectionGroupProps {
  title?: string;
  onPress?: () => void;
  subTitle?: string;
  iconType: string;
}

const SelectionGroup = (props: ISelectionGroupProps) => {
  const { title, onPress, subTitle, iconType } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const ICON_SIZE = scaledSize.moderateScale(24);

  return (
    <>
      <Pressable style={styles.container} onPress={onPress}>
        <Box rowAlignCenter>
          <IconCategory type={iconType} />
          <Box marginLeft={scaledSize.moderateScale(12)}>
            <Text variants="caption2" style={styles.title}>
              {title}
            </Text>
            <Text variants="body1">{subTitle}</Text>
          </Box>
        </Box>

        <SvgFromString
          svg={theme.icons.arrowDown}
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      </Pressable>
    </>
  );
};

export default memo(SelectionGroup);

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      height: scaledSize.verticalScale(63),
      borderRadius: scaledSize.moderateScale(16),
      backgroundColor: theme.palette.neutral6,
      paddingHorizontal: scaledSize.moderateScale(16),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontWeight: '400',
      color: theme.palette.neutral2,
    },
  });
