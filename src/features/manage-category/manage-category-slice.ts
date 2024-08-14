import { createAction, createReducer, current } from '@reduxjs/toolkit';
import { ICategories, IInitialStateProps, INITIAL_CATEGORIES } from './types';

const initialState: IInitialStateProps = {
  categories: INITIAL_CATEGORIES,
};

export const categoriesReducerName = 'categories';

export class CategoriesAction {
  static setCategories = createAction<{ categories: ICategories[] }>(
    categoriesReducerName + '/setCategories',
  );
  static createCategory = createAction<{ category: ICategories[] }>(
    categoriesReducerName + '/createCategory',
  );
}

export const categoriesReducer = createReducer(initialState, builder => {
  builder
    .addCase(CategoriesAction.setCategories, (state, { payload }) => {
      return { ...state, categories: payload.categories };
    })
    .addCase(CategoriesAction.createCategory, (state, { payload }) => {
      const currentState = current(state);
      return {
        ...state,
        categories: currentState.categories.concat(payload.category),
      };
    });
});

export const getCategories = (state: {
  [categoriesReducerName]: IInitialStateProps;
}) => state[categoriesReducerName].categories;
