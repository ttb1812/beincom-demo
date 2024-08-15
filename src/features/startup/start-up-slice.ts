import { createAction, createReducer } from '@reduxjs/toolkit';
import { IStartupState } from './types';

const initialState: IStartupState = {
  language: [
    { title: 'English', isSelected: true, code: 'en' },
    { title: 'Tiếng Việt', isSelected: false, code: 'vi' },
  ],
};

export const startUpReducerName = 'startUp';

export class StartUpAction {
  static setLanguage = createAction<{ language: any[] }>(
    startUpReducerName + '/setLanguage',
  );
}

export const startUpReducer = createReducer(initialState, builder => {
  builder.addCase(StartUpAction.setLanguage, (state, { payload }) => {
    return { ...state, language: payload.language };
  });
});

export const getLanguage = (state: { [startUpReducerName]: IStartupState }) =>
  state[startUpReducerName].language;
