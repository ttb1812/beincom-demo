export interface IInitialStateProps {
  categories: ICategories[];
}

export interface ITaskItem {
  id?: string;
  taskName?: string;
  decription?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  categoryId?: string;
}

export interface ICategories {
  id: string;
  categoryName: string;
  iconType: string;
  tasks?: ITaskItem[];
  show: boolean;
}

export const INITIAL_CATEGORIES = [
  {
    id: 'category/1',
    categoryName: 'Jobs',
    iconType: 'jobs',
    show: true,
    tasks: [
      {
        id: 'category/1',
        taskName: 'research',
        decription: 'research decription',
        status: 'toDo',
        startDate: '',
        endDate: '',
        categoryId: 'category/1',
      },
    ],
  },
  {
    id: 'category/2',
    categoryName: 'Personal',
    iconType: 'personal',
    show: true,
  },
  {
    id: 'category/3',
    categoryName: 'Favorite',
    iconType: 'favorite',
    show: true,
  },
  {
    id: 'category/4',
    categoryName: 'Birthday',
    iconType: 'birthday',
    show: true,
  },
];
