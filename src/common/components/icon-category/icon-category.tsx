import React, { memo } from 'react';
import { Box } from '../box';
import { SvgFromString } from '../svg-from-string';
import { StyleSheet } from 'react-native';
import { scaledSize } from '../../utils';

interface IIconCategoryProps {
  icon: string;
  backgroundColor: string;
}

const IconCategory = (props: IIconCategoryProps) => {
  const { icon, backgroundColor } = props;
  return (
    <Box style={[styles.conainer, { backgroundColor: backgroundColor }]}>
      <Box style={styles.contentConainer}>
        <SvgFromString svg={icon} />
      </Box>
    </Box>
  );
};

export default memo(IconCategory);
const styles = StyleSheet.create({
  conainer: {
    borderRadius: scaledSize.moderateScale(12),
  },
  contentConainer: {
    padding: scaledSize.moderateScale(8),
  },
});
