import { Skeleton, VStack } from 'native-base';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { logger, ternaryOperator } from '../../utils';
import { ImageProps } from './types';
import useImageViewModel from './use-image-view-model';

const Image = (props: ImageProps) => {
  const { stylesImage, stylesBorder } = useImageViewModel(props);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isError, setIsError] = useState(false);

  const { thumbnail, source, showImageFullScreen = false } = props;

  const onLoadStart = useCallback(() => {
    if (!isLoaded) {
      setIsError(false);
      setIsLoading(true);
    }
  }, [isLoaded]);

  const onLoadEnd = useCallback(() => {
    setIsLoading(false);
    setIsLoaded(true);
  }, []);

  const onError = useCallback(() => {
    setIsError(true);
  }, []);

  const formattedSource = useMemo(
    () => ternaryOperator(isError, thumbnail, source),
    [isError, thumbnail, source],
  );

  //   const onPress = useCallback(() => {
  //     if (showImageFullScreen) {
  //       NavigationService.navigate(ScreenName.imageFullScreen);
  //     }
  //   }, [showImageFullScreen]);

  const onPress = useCallback(() => {
    if (showImageFullScreen) {
      logger.log('onPress =>>>>>>>>>>>>>');
    }
  }, [showImageFullScreen]);

  const _renderSkeleton = useCallback(() => {
    return (
      <VStack
        width={stylesImage.width as number}
        height={stylesImage.height as number}
        borderRadius={stylesImage.borderLeftWidth}
      >
        <Skeleton w="full" h="full" />
      </VStack>
    );
  }, [stylesImage.borderLeftWidth, stylesImage.height, stylesImage.width]);

  return (
    <Pressable onPress={onPress}>
      <View style={stylesBorder}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          onError={onError}
          style={stylesImage}
          source={formattedSource}
        >
          {ternaryOperator(isLoading || !isLoaded, _renderSkeleton(), null)}
        </FastImage>
      </View>
    </Pressable>
  );
};

export default memo(Image);
