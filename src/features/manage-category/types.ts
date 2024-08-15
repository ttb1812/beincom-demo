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
    id: 'jobs-12386432',
    categoryName: 'jobs',
    iconType: 'jobs',
    show: true,
    tasks: [
      {
        id: ''.uuidv4(),
        taskName: 'Do Math Homework',
        description: 'Do Math Homework Description',
        status: STATUS_ENUM.TO_DO,
        startDate: '',
        endDate: '',
        categoryId: 'jobs-12386432',
        iconTypeCategory: 'jobs',
      },
      {
        id: ''.uuidv4(),
        taskName: 'Tack out dogs',
        description: 'Tack out dogs Description',
        status: STATUS_ENUM.TO_DO,
        startDate: '',
        endDate: '',
        categoryId: 'jobs-12386432',
        iconTypeCategory: 'jobs',
      },
      {
        id: ''.uuidv4(),
        taskName: 'Business meeting with CEO',
        description: 'Business meeting with CEO Description',
        status: STATUS_ENUM.COMPLETED,
        startDate: '',
        endDate: '',
        categoryId: 'jobs-12386432',
        iconTypeCategory: 'jobs',
      },
    ],
  },
  {
    id: 'personal-12386432',
    categoryName: 'personal',
    iconType: 'personal',
    show: true,
    tasks: [
      {
        id: ''.uuidv4(),
        taskName: 'Do Math Homework',
        description: 'Do Math Homework Description',
        status: STATUS_ENUM.TO_DO,
        startDate: '',
        endDate: '',
        categoryId: 'personal-12386432',
        iconTypeCategory: 'personal',
      },
      {
        id: ''.uuidv4(),
        taskName: 'Tack out dogs',
        description: 'Tack out dogs Description',
        status: STATUS_ENUM.COMPLETED,
        startDate: '',
        endDate: '',
        categoryId: 'personal-12386432',
        iconTypeCategory: 'personal',
      },
      {
        id: ''.uuidv4(),
        taskName: 'Business meeting with CEO',
        description: 'Business meeting with CEO Description',
        status: STATUS_ENUM.TO_DO,
        startDate: '',
        endDate: '',
        categoryId: 'personal-12386432',
        iconTypeCategory: 'personal',
      },
    ],
  },
  {
    id: 'favorite-12386432',
    categoryName: 'favorite',
    iconType: 'favorite',
    show: true,
    tasks: [],
  },
  {
    id: 'birthday-12386432',
    categoryName: 'birthday',
    iconType: 'birthday',
    show: true,
    tasks: [
      {
        id: ''.uuidv4(),
        taskName: 'Do Math Homework',
        description: 'Do Math Homework Description',
        status: STATUS_ENUM.TO_DO,
        startDate: '',
        endDate: '',
        categoryId: 'birthday-12386432',
        iconTypeCategory: 'birthday',
      },
      {
        id: ''.uuidv4(),
        taskName: 'Tack out dogs',
        description: 'Tack out dogs Description',
        status: STATUS_ENUM.COMPLETED,
        startDate: '',
        endDate: '',
        categoryId: 'birthday-12386432',
        iconTypeCategory: 'birthday',
      },
      {
        id: ''.uuidv4(),
        taskName: 'Business meeting with CEO',
        description: 'Business meeting with CEO Description',
        status: STATUS_ENUM.TO_DO,
        startDate: '',
        endDate: '',
        categoryId: 'birthday-12386432',
        iconTypeCategory: 'birthday',
      },
      {
        id: ''.uuidv4(),
        taskName: 'Tack out dogs 1',
        description: 'Tack out dogs Description',
        status: STATUS_ENUM.COMPLETED,
        startDate: '',
        endDate: '',
        categoryId: 'birthday-12386432',
        iconTypeCategory: 'birthday',
      },
      {
        id: ''.uuidv4(),
        taskName: 'Tack out dogs to city',
        description: 'Tack out dogs Description',
        status: STATUS_ENUM.COMPLETED,
        startDate: '',
        endDate: '',
        categoryId: 'birthday-12386432',
        iconTypeCategory: 'birthday',
      },
    ],
  },
] as ICategories[];
