import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { Box } from '../../box';
import { Text } from '../../text';
import { IconButton } from '../../icon-button';
import { scaledSize, useAppTheme } from '../../../utils';

interface IDrawerHeaderProps {
  onClose?: () => void;
  onDone?: () => void;
  title?: string;
}

const DrawerHeader = (props: IDrawerHeaderProps) => {
  const { onClose, onDone, title } = props;
  const theme = useAppTheme();
  return (
    <Box style={styles.headerContainer}>
      <IconButton
        width={16}
        height={16}
        svg={theme.icons.cancel}
        onPress={onClose}
      />
      <Text variants="title2">{title}</Text>
      <IconButton
        width={16}
        height={16}
        svg={theme.icons.check}
        onPress={onDone}
      />
    </Box>
  );
};

export default memo(DrawerHeader);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaledSize.moderateScale(12),
    paddingVertical: scaledSize.moderateScale(6),
    justifyContent: 'space-between',
  },
});
