import { ISectionItemProps } from '../../common/components';

export const MenuActionKeys = {
  sync: 'customize/sync',
  theme: 'customize/theme',
  category: 'customize/category',
  language: 'customize/language',
  firstDateOfWeek: 'dateTime/firstDateOfWeek',
  timeFormat: 'dateTime/timeFormat',
  dateFormat: 'dateTime/dateFormat',
  dueDate: 'dateTime/dueDate',
  helpAndFeedback: 'about/helpAndFeedback',
  followUs: 'about/followUs',
  shareApp: 'about/shareApp',
  about: 'about/about',
} as const;
export interface IMainMenu {
  sectionId: number;
  sectionName: string;
  item: Array<ISectionItemProps & { key: typeof MenuActionKeys }>;
}
