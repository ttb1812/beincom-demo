import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { Box } from '../../box';
import { Text } from '../../text';
import { IconButton } from '../../icon-button';
import { scaledSize, useAppTheme } from '../../../utils';

interface IDrawerHeaderProps {
  onClose?: () => void;
  title?: string;
}

const DrawerHeader = (props: IDrawerHeaderProps) => {
  const { onClose, title } = props;
  const ICON_SIZE = scaledSize.moderateScale(16);
  const theme = useAppTheme();
  return (
    <Box style={styles.headerContainer}>
      <IconButton
        width={ICON_SIZE}
        height={ICON_SIZE}
        svg={theme.icons.cancel}
        onPress={onClose}
      />
      <Text variants="title2">{title}</Text>
      <Box width={scaledSize.moderateScale(48)} />
    </Box>
  );
};

export default memo(DrawerHeader);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaledSize.verticalScale(52),
    paddingHorizontal: scaledSize.moderateScale(12),
    justifyContent: 'space-between',
  },
});
