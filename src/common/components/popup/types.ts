import { PropsWithChildren } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export namespace NSPopup {
  export interface IPopupOptions {
    mode?: 'toast' | 'confirm';
    title?: string;
    titleTextStyle?: TextStyle;
    message: string;
    messageTextStyle?: TextStyle;
    messageNumberOfLines?: number;
    messageHighlight?: string;
    messageHighlightTextStyle?: TextStyle;
    showButtonReminder?: boolean;
    textReminderStyle?: TextStyle;
    userInterfaceStyle?: 'unspecified' | 'light' | 'dark';
    cancelButton?: Omit<
      IPopupButton,
      'isPreventModal' | 'loading' | 'loadingText'
    >;
    confirmButton?: IPopupButton;
    extraComponent?: () => React.ReactNode;
  }

  export const POPUP_MODE = {
    toast: 'toast',
    confirm: 'confirm',
  } as const;

  export interface IPopupButton {
    text?: string;
    textStyle?: TextStyle;
    style?: ViewStyle;
    onPress?: Callback;
    mode?: 'primary' | 'success' | 'error' | 'warning';
    isPreventModal?: boolean;
    loading?: boolean;
    loadingText?: string;
  }

  export type Callback = ((remindAgain?: boolean) => void) | undefined;

  export interface IPopupProps extends PropsWithChildren {
    popupId: string;
    defaultButtonText?: string;
    defaultButtonTextStyle?: ViewStyle;
  }

  export interface IPopupState {
    popupOptions?: IPopupOptions;
  }

  export interface IPopupStatic {
    show: (options: IPopupOptions) => void;
    hide: () => void;
    removeInstance?: (instanceId: string) => void;
  }

  export interface IPopupAction {
    showPopup: (options: IPopupOptions) => void;
    hidePopup: () => void;
  }
}
