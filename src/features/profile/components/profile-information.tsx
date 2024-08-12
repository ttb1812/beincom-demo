import { StyleSheet, Pressable } from 'react-native';
import React, { memo, useMemo } from 'react';
import { Box, Image, SvgFromString, Text } from '../../../common/components';
import { scaledSize, useAppTheme } from '../../../common/utils';

const AVATAR_SIZE = scaledSize.moderateScale(70);
const ICON_SIZE = scaledSize.moderateScale(24);

interface IProfileInformationProps {
  onPress?: () => void;
}

const ProfileInformation = (props: IProfileInformationProps) => {
  const { onPress } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(), []);
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Box row alignCenter>
        <Image source={theme.images.defaultAvatar} style={styles.avatarImage} />
        <Box
          flex
          paddingLeft={scaledSize.moderateScale(16)}
          rowAlignCenter
          justifyContent="space-between"
        >
          <Box>
            <Text variants="body2">Sign in or Sign up</Text>
          </Box>
          <SvgFromString
            svg={theme.icons.arrowRightBold}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        </Box>
      </Box>
    </Pressable>
  );
};

export default memo(ProfileInformation);

const makeStyles = () =>
  StyleSheet.create({
    container: {
      paddingRight: scaledSize.moderateScale(16),
    },
    avatarImage: {
      width: AVATAR_SIZE,
      height: AVATAR_SIZE,
    },
  });
