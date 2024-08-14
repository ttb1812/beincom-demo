import { useCallback, useState } from 'react';
import {
  AppConfig,
  NavigationService,
  ScreenName,
  useAppTheme,
} from '../../common/utils';
import { IMainMenu, MenuActionKeys } from './types';
import { PopupManager } from '../../common/components';

const useProfileScreen = () => {
  const theme = useAppTheme();
  const [drawerLanguageVisible, setDrawerLanguageVisible] = useState(false);

  const openLanguageDrawer = () => {
    setDrawerLanguageVisible(true);
  };

  const mainMenuConfig = [
    {
      sectionId: 1,
      sectionName: 'Customize',
      item: [
        {
          key: MenuActionKeys.sync,
          icon: theme.icons.cloud,
          title: 'Sync',
          subTitle: undefined,
          mode: 'develop',
        },
        {
          key: MenuActionKeys.theme,
          icon: theme.icons.brush,
          title: 'Theme',
          subTitle: undefined,
          mode: 'develop',
        },
        {
          key: MenuActionKeys.category,
          icon: theme.icons.elementPlus,
          title: 'Category',
          subTitle: undefined,
        },
        {
          key: MenuActionKeys.language,
          icon: theme.icons.globalIcon,
          title: 'Language',
          subTitle: undefined,
        },
      ],
    },
    {
      sectionId: 2,
      sectionName: 'Date & Time',
      item: [
        {
          key: MenuActionKeys.firstDateOfWeek,
          icon: theme.icons.numSeven,
          title: 'First Date Of Week',
          subTitle: 'Auto',
          mode: 'develop',
        },
        {
          key: MenuActionKeys.timeFormat,
          icon: theme.icons.clock,
          title: 'Time Format',
          subTitle: 'Default',
          mode: 'develop',
        },
        {
          key: MenuActionKeys.dateFormat,
          icon: theme.icons.calendarStick,
          title: 'Date Format',
          subTitle: '2024/08/12',
          mode: 'develop',
        },
        {
          key: MenuActionKeys.dueDate,
          icon: theme.icons.calendarDate,
          title: 'Due Date',
          subTitle: 'Today',
          mode: 'develop',
        },
      ],
    },
    {
      sectionId: 3,
      sectionName: undefined,
      item: [
        {
          key: MenuActionKeys.helpAndFeedback,
          icon: theme.icons.messages,
          title: 'Help & Feedback',
          subTitle: undefined,
          mode: 'develop',
        },

        {
          key: MenuActionKeys.about,
          icon: theme.icons.profileTick,
          title: 'About',
          subTitle: `v${AppConfig.APP_VERSION}`,
          mode: 'develop',
        },
        {
          key: MenuActionKeys.shareApp,
          icon: theme.icons.shareBold,
          title: 'Share App',
          subTitle: undefined,
          mode: 'develop',
          showIconRight: false,
        },
      ],
    },
  ] as unknown as IMainMenu[];

  const featureDevelop = useCallback(() => {
    PopupManager.instance?.show({
      title: 'Feature development!',
      message: '',
      confirmButton: {
        text: 'Ok',
      },
    });
  }, []);

  const handlePressItem = useCallback(
    (key: typeof MenuActionKeys | string) => {
      switch (key) {
        case MenuActionKeys.category:
          NavigationService.navigate(ScreenName.manageCategoryScreen);
          break;
        case MenuActionKeys.language:
          openLanguageDrawer();
          break;
        default:
          featureDevelop();
          break;
      }
    },
    [featureDevelop],
  );
  return {
    mainMenuConfig,
    onPressItem: handlePressItem,
    drawerLanguageVisible,
    setDrawerLanguageVisible,
    featureDevelop,
  };
};

export default useProfileScreen;
