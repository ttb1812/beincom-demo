import { StyleSheet, Pressable } from 'react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { Box } from '../box';
import { IBox } from '../box/types';
import { ITheme, scaledSize, useAppTheme } from '../../utils';
import { isUndefined } from 'lodash';
import { Text } from '../text';
import { SvgFromString } from '../svg-from-string';
import { ISectionItemProps } from './types';

const SectionContainer = memo((props: IBox & { title?: string }) => {
  const { children, title, ...resProps } = props;
  const theme = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const _renderTitle = useCallback(() => {
    if (!isUndefined(title)) {
      return (
        <Box paddingBottom={scaledSize.moderateScale(8)}>
          <Text variants="caption1" style={styles.titleTxt}>
            {title}
          </Text>
        </Box>
      );
    }
  }, [styles.titleTxt, title]);

  return (
    <>
      {_renderTitle()}
      <Box style={styles.container} {...resProps}>
        {children}
      </Box>
    </>
  );
});

const SectionItem = memo((props: ISectionItemProps) => {
  const theme = useAppTheme();
  const {
    title,
    onPress,
    subTitle,
    icon = theme.icons.arrowRightBold,
    showIconRight = true,
  } = props;
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const ICON_SIZE = scaledSize.moderateScale(24);
  const _renderSubtitle = useCallback(() => {
    if (!isUndefined(subTitle)) {
      return (
        <Box paddingRight={scaledSize.moderateScale(8)}>
          <Text variants="caption1" style={styles.subTitleTxt}>
            {subTitle}
          </Text>
        </Box>
      );
    }
  }, [styles.subTitleTxt, subTitle]);

  const _renderIconRight = useCallback(() => {
    if (showIconRight) {
      return (
        <SvgFromString
          svg={theme.icons.arrowRightBold}
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
      );
    }
  }, [ICON_SIZE, showIconRight, theme.icons.arrowRightBold]);

  return (
    <Pressable style={styles.itemContainer} onPress={onPress}>
      <Box rowAlignCenter>
        <SvgFromString svg={icon} width={ICON_SIZE} height={ICON_SIZE} />
        <Box paddingLeft={scaledSize.moderateScale(8)}>
          <Text variants="body2">{title}</Text>
        </Box>
      </Box>
      <Box rowAlignCenter>
        {_renderSubtitle()}
        {_renderIconRight()}
      </Box>
    </Pressable>
  );
});

export const Section = {
  Container: SectionContainer,
  Item: SectionItem,
};

const makeStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      padding: scaledSize.moderateScale(16),
      backgroundColor: theme.palette.neutral6,
      // borderWidth: 0.5,
      // borderColor: theme.palette.neutral5,
      borderRadius: scaledSize.moderateScale(16),
    },
    titleTxt: {
      fontWeight: '400',
      color: theme.palette.neutral3,
    },
    subTitleTxt: {
      fontWeight: '400',
      color: theme.palette.neutral3,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
