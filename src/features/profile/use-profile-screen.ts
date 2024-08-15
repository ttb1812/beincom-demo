import { useCallback, useMemo, useState } from 'react';
import {
  AppConfig,
  changeLanguage,
  NavigationService,
  ScreenName,
  translate,
  useAppTheme,
} from '../../common/utils';
import { IMainMenu, MenuActionKeys } from './types';
import { PopupManager } from '../../common/components';
import { useDispatch, useSelector } from 'react-redux';
import { getLanguage, StartUpAction } from '../startup/start-up-slice';

const useProfileScreen = () => {
  const theme = useAppTheme();
  const [drawerLanguageVisible, setDrawerLanguageVisible] = useState(false);
  const languages = useSelector(getLanguage);
  const dispatch = useDispatch();

  const formattedLanguage = useMemo(() => {
    return languages.map(item => {
      return {
        title: item.title,
        subTitle: item.code,
        isSelected: item.isSelected,
      };
    });
  }, [languages]);

  const openLanguageDrawer = () => {
    setDrawerLanguageVisible(true);
  };

  const mainMenuConfig = [
    {
      sectionId: 1,
      sectionName: 'profile.customize',
      item: [
        {
          key: MenuActionKeys.sync,
          icon: theme.icons.cloud,
          title: 'profile.sync',
          subTitle: undefined,
          mode: 'develop',
        },
        {
          key: MenuActionKeys.theme,
          icon: theme.icons.brush,
          title: 'profile.theme',
          subTitle: undefined,
          mode: 'develop',
        },
        {
          key: MenuActionKeys.category,
          icon: theme.icons.elementPlus,
          title: 'profile.category',
          subTitle: undefined,
        },
        {
          key: MenuActionKeys.language,
          icon: theme.icons.globalIcon,
          title: 'profile.language',
          subTitle: undefined,
        },
      ],
    },
    {
      sectionId: 2,
      sectionName: 'profile.dateTime',
      item: [
        {
          key: MenuActionKeys.firstDateOfWeek,
          icon: theme.icons.numSeven,
          title: 'profile.firstDateOfWeek',
          subTitle: 'Auto',
          mode: 'develop',
        },
        {
          key: MenuActionKeys.timeFormat,
          icon: theme.icons.clock,
          title: 'profile.timeFormat',
          subTitle: 'profile.default',
          mode: 'develop',
        },
        {
          key: MenuActionKeys.dateFormat,
          icon: theme.icons.calendarStick,
          title: 'profile.dateFormat',
          subTitle: '2024/08/12',
          mode: 'develop',
        },
        {
          key: MenuActionKeys.dueDate,
          icon: theme.icons.calendarDate,
          title: 'profile.dueDate',
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
          title: 'profile.helpFeedback',
          subTitle: undefined,
          mode: 'develop',
        },

        {
          key: MenuActionKeys.about,
          icon: theme.icons.profileTick,
          title: 'profile.about',
          subTitle: `v${AppConfig.APP_VERSION}`,
          mode: 'develop',
        },
        {
          key: MenuActionKeys.shareApp,
          icon: theme.icons.shareBold,
          title: 'profile.shareApp',
          subTitle: undefined,
          mode: 'develop',
          showIconRight: false,
        },
      ],
    },
  ] as unknown as IMainMenu[];

  const featureDevelop = useCallback(() => {
    PopupManager.instance?.show({
      title: translate('featureDevelopmemt'),
      message: '',
      confirmButton: {
        text: translate('ok'),
      },
    });
  }, []);

  const handleSelectedLangue = useCallback(
    (la: any) => {
      const newLanguages = languages?.map(item => {
        return {
          ...item,
          isSelected: item?.code === la?.subTitle,
        };
      });
      changeLanguage(la.subTitle);
      dispatch(StartUpAction.setLanguage({ language: newLanguages }));
    },
    [dispatch, languages],
  );

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
    formattedLanguage,
    handleSelectedLangue,
  };
};

export default useProfileScreen;
