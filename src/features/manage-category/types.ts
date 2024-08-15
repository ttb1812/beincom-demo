export interface IInitialStateProps {
  categories: ICategories[];
}

export enum STATUS_ENUM {
  TO_DO = 'to_do',
  COMPLETED = 'completed',
}

export interface ITaskItem {
  id?: string;
  taskName?: string;
  description?: string;
  status?: STATUS_ENUM;
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  iconTypeCategory?: 'jobs' | 'personal' | 'favorite' | 'birthday';
}

export interface ICategories {
  id: string;
  categoryName: string;
  iconType: 'jobs' | 'personal' | 'favorite' | 'birthday';
  tasks?: ITaskItem[];
  show: boolean;
}

export const INITIAL_CATEGORIES = [
  {
    id: ''.uuidv4(),
    categoryName: 'Jobs',
    iconType: 'jobs',
    show: true,
    tasks: [],
  },
  {
    id: ''.uuidv4(),
    categoryName: 'Personal',
    iconType: 'personal',
    show: true,
    tasks: [],
  },
  {
    id: ''.uuidv4(),
    categoryName: 'Favorite',
    iconType: 'favorite',
    show: true,
    tasks: [],
  },
  {
    id: ''.uuidv4(),
    categoryName: 'Birthday',
    iconType: 'birthday',
    show: true,
    tasks: [],
  },
];
