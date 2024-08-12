import { useCallback, useState } from 'react';
import {
  AppConfig,
  NavigationService,
  ScreenName,
  useAppTheme,
} from '../../common/utils';
import { IMainMenu, MenuActionKeys } from './types';

const useProfileScreen = () => {
  const theme = useAppTheme();
  const [drawerLanguageVisible, setdrawerLanguageVisible] = useState(false);

  const openLanguageDrawer = () => {
    setdrawerLanguageVisible(true);
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
        },
        {
          key: MenuActionKeys.theme,
          icon: theme.icons.brush,
          title: 'Theme',
          subTitle: undefined,
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
        },
        {
          key: MenuActionKeys.timeFormat,
          icon: theme.icons.clock,
          title: 'Time Format',
          subTitle: 'Default',
        },
        {
          key: MenuActionKeys.dateFormat,
          icon: theme.icons.calendarStick,
          title: 'Date Format',
          subTitle: '2024/08/12',
        },
        {
          key: MenuActionKeys.dueDate,
          icon: theme.icons.calendarDate,
          title: 'Due Date',
          subTitle: 'Today',
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
        },

        {
          key: MenuActionKeys.about,
          icon: theme.icons.profileTick,
          title: 'About',
          subTitle: `v${AppConfig.APP_VERSION}`,
        },
        {
          key: MenuActionKeys.shareApp,
          icon: theme.icons.shareBold,
          title: 'Share App',
          subTitle: undefined,
          showIconRight: false,
        },
      ],
    },
  ] as unknown as IMainMenu[];

  const handlePressItem = useCallback((key: typeof MenuActionKeys | string) => {
    switch (key) {
      case MenuActionKeys.theme:
        NavigationService.navigate(ScreenName.themeScreen);
        break;
      case MenuActionKeys.category:
        NavigationService.navigate(ScreenName.manageCategoryScreen);
        break;
      case MenuActionKeys.language:
        openLanguageDrawer();
        break;

      default:
        break;
    }
  }, []);
  return {
    mainMenuConfig,
    onPressItem: handlePressItem,
    drawerLanguageVisible,
    setdrawerLanguageVisible,
  };
};

export default useProfileScreen;
