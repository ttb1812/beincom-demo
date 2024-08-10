import { Platform } from 'react-native';
import Config from 'react-native-config';

export class AppConfig {
  static readonly ENV = Config.ENV;
  static readonly APP_NAME = Config.APP_NAME;
  static readonly API_URL = Config.API_URL;
  static readonly APP_VERSION =
    Platform.OS === 'ios'
      ? `${Config.IOS_APP_VERSION_CODE}.${Config.IOS_APP_BUILD_CODE}`
      : `${Config.ANDROID_APP_VERSION_NAME}.${Config.ANDROID_APP_VERSION_CODE}`;
}
