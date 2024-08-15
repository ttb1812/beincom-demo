import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { scaledSize } from '../../../utils';
import { Box } from '../../box';
import { CheckBox } from '../../check-box';
import { Text } from '../../text';
import { IItemList } from '../types';

const DrawerItem = (props: IItemList & { onPress: () => void }) => {
  const { title, isSelected, onPress } = props;
  const styles = useMemo(() => makeStyles(), []);
  return (
    <Pressable onPress={onPress}>
      <Box style={styles.container}>
        <CheckBox isChecked={isSelected} onToggle={onPress} />
        <Box marginLeft={scaledSize.moderateScale(16)}>
          <Text variants="body2">{title}</Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default DrawerItem;

const makeStyles = () =>
  StyleSheet.create({
    container: {
      height: scaledSize.verticalScale(52),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scaledSize.moderateScale(22),
    },
  });
