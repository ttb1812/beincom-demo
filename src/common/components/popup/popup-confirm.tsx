/* eslint-disable react-native/no-inline-styles */
import React, { PropsWithChildren } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleSheet,
} from 'react-native';
import { scaledSize, useAppTheme } from '../../../common/utils';
import { Box } from '../box';
import { Text } from '../text';
import { NSPopup } from './types';
import color from 'color';
function createReactNodeHOC<P = any>(
  WrappedComponent: any,
  props: PropsWithChildren<P>,
) {
  return <WrappedComponent {...props}>{props?.children}</WrappedComponent>;
}

const PopupConfirm = React.forwardRef<NSPopup.IPopupAction, any>(
  (_props, ref) => {
    const theme = useAppTheme();
    const [visible, setVisible] = React.useState(false);
    const [remindStatus, setRemindStatus] = React.useState<boolean>(false);
    const [popupOptions, setPopupOptions] = React.useState<
      NSPopup.IPopupOptions | undefined
    >(undefined);

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const fadeIn = React.useCallback(() => {
      setVisible(true);
      // Will change fadeAnim value to 1 in 0.15 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start();
    }, [fadeAnim]);

    const fadeOut = React.useCallback(() => {
      // Will change fadeAnim value to 0 in 0.2 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(() => {
        setVisible(false);
        setRemindStatus(false);
        setPopupOptions(undefined);
      });
    }, [fadeAnim]);

    const showModal = fadeIn;
    const hideModal = fadeOut;

    const handleShowPopup = React.useCallback(
      (options: NSPopup.IPopupOptions): void => {
        setRemindStatus(false);
        setPopupOptions(undefined);
        setPopupOptions(options);
        showModal();
        if (options?.mode === NSPopup.POPUP_MODE.toast) {
          setTimeout(() => {
            hideModal();
          }, 1000);
        }
      },
      [hideModal, showModal],
    );

    const handleConfirm = React.useCallback(
      (callback: NSPopup.Callback) => () => {
        callback?.(popupOptions?.showButtonReminder ? remindStatus : undefined);
        if (!popupOptions?.confirmButton?.isPreventModal) {
          hideModal();
        }
      },
      [hideModal, popupOptions, remindStatus],
    );

    React.useImperativeHandle(
      ref,
      () => ({
        showPopup: handleShowPopup,
        hidePopup: hideModal,
      }),
      [handleShowPopup, hideModal],
    );

    const modalContent = React.useMemo(() => {
      if (!popupOptions) {
        return <React.Fragment />;
      }

      if (popupOptions.mode === NSPopup.POPUP_MODE.toast) {
        return (
          <Animated.View
            style={{
              backgroundColor: 'transparent',
              opacity: fadeAnim,
              ...styles.modalContain,
            }}
          >
            <Animated.View
              style={[
                styles.popupSuccess,
                {
                  transform: [{ scale: fadeAnim }],
                  backgroundColor: theme.palette.neutral1,
                },
              ]}
            >
              <Box flexDirection="column" alignCenter>
                <Text>icon</Text>
              </Box>
              <Box paddingTop={scaledSize.moderateScale(8)}>
                <Text>{popupOptions.message}</Text>
              </Box>
            </Animated.View>
          </Animated.View>
        );
      }

      return (
        <Animated.View
          style={{
            backgroundColor: color(theme.palette.neutral1)
              .alpha(0.6)
              .rgb()
              .string(),
            opacity: fadeAnim,
            ...styles.modalContain,
          }}
        >
          <Animated.View
            style={[
              styles.popupContainer,
              {
                transform: [{ scale: fadeAnim }],
                opacity: fadeAnim,
                backgroundColor: theme.palette.neutral6,
              },
            ]}
          >
            {/* Content */}
            <Box>
              {popupOptions.title ? (
                <>
                  <Text style={popupOptions.titleTextStyle} variants="body2">
                    {popupOptions.title}
                  </Text>
                  <Box height="4" />
                </>
              ) : null}
              {popupOptions.message ? (
                <>
                  <Text
                    numberOfLines={popupOptions.messageNumberOfLines}
                    style={popupOptions.messageTextStyle}
                    textHighLight={popupOptions.messageHighlight}
                    textHightLightStyle={popupOptions.messageHighlightTextStyle}
                  >
                    {popupOptions.message}
                  </Text>
                  <Box height="4" />
                </>
              ) : null}
              {popupOptions.extraComponent
                ? popupOptions.extraComponent()
                : null}
            </Box>

            {/* Actions */}
            <Box height={scaledSize.verticalScale(44)} row justifyEnd alignEnd>
              <Pressable
                onPress={handleConfirm(popupOptions.confirmButton?.onPress)}
              >
                <Box
                  backgroundColor={theme.palette.primary1}
                  paddingHorizontal={scaledSize.moderateScale(16)}
                  paddingVertical={scaledSize.moderateScale(6)}
                  borderRadius={scaledSize.moderateScale(12)}
                >
                  <Text color={theme.palette.neutral6} variants="body2">
                    {popupOptions.confirmButton?.text}
                  </Text>
                </Box>
              </Pressable>
            </Box>
          </Animated.View>
        </Animated.View>
      );
    }, [
      popupOptions,
      fadeAnim,
      handleConfirm,
      theme.palette.primary1,
      theme.palette.neutral6,
      theme.palette.neutral1,
    ]);

    return React.useMemo(() => {
      if (Platform.OS === 'ios') {
        return createReactNodeHOC<RNModalProps>(RNModal, {
          children: modalContent,
          visible: visible,
          presentationStyle: 'overFullScreen',
          transparent: true,
          supportedOrientations: [
            'portrait',
            'landscape',
            'landscape-left',
            'landscape-right',
          ],
        });
      }
      return createReactNodeHOC<RNModalProps>(RNModal, {
        visible: visible,
        children: modalContent,
        presentationStyle: 'overFullScreen',
        transparent: true,
        statusBarTranslucent: true,
        supportedOrientations: [
          'portrait',
          'landscape',
          'landscape-left',
          'landscape-right',
        ],
      });
    }, [modalContent, visible]);
  },
);

export default React.memo(PopupConfirm);

const styles = StyleSheet.create({
  modalContain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  popupContainer: {
    width: scaledSize.scale(320),
    padding: scaledSize.moderateScale(24),
    borderRadius: scaledSize.moderateScale(12),
  },
  popupSuccess: {
    paddingHorizontal: scaledSize.moderateScale(24),
    paddingVertical: scaledSize.moderateScale(12),
    borderRadius: scaledSize.moderateScale(8),
    opacity: 0.8,
  },
});
