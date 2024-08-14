import { createAction, createReducer } from '@reduxjs/toolkit';
import { IStartupState } from './types';

const initialState: IStartupState = {
  language: [
    { title: 'English', isSselected: true },
    { title: 'Tiếng Việt', isSelected: false },
  ],
};

export const startUpReducerName = 'startUp';

export class StartUpAction {
  static setLanguage = createAction<any>(startUpReducerName + '/setLanguage');
}

export const startUpReducer = createReducer(initialState, builder => {
  builder.addCase(StartUpAction.setLanguage, state => {
    return { ...state, language: [] };
  });
});

export const getLanguage = (state: { [startUpReducerName]: IStartupState }) =>
  state[startUpReducerName].language;
