import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from '../../content';
import { logger } from './logger';

i18n
  .use({
    type: 'languageDetector',
    async: false,
    detect: () => {},
    cacheUserLanguage: () => {},
  })
  .use(initReactI18next)
  ?.init({
    resources: translations,
    compatibilityJSON: 'v3',
    react: {
      useSuspense: false,
    },
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: ['common', 'application'],
  })
  .then(res => {
    logger.success('init locale successful!', res);
  })
  .catch(err => {
    logger.error('init locale failure!', err);
  });

export const translate = i18n.t;

export const changeLanguage = i18n.changeLanguage;

export default i18n;
