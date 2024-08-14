import { combineReducers } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer } from 'redux-persist';
import { reduxStorage } from '../common/utils';
import createCompressor from 'redux-persist-transform-compress';
import {
  startUpReducer,
  startUpReducerName,
} from '../features/startup/start-up-slice';
import {
  calendarReducerName,
  calendarReducer,
} from '../features/calendar/calendar-slice';
import {
  categoriesReducerName,
  categoriesReducer,
} from '../features/manage-category/manage-category-slice';

const rootReducer = combineReducers({
  // [reducername]: reducer
  [startUpReducerName]: startUpReducer,
  [calendarReducerName]: calendarReducer,
  [categoriesReducerName]: categoriesReducer,
});

const whitelist: string[] = [
  // reducerName
  startUpReducerName,
  categoriesReducerName,
];
const compressor = createCompressor({ whitelist });
const config: PersistConfig<any> = {
  key: 'root',
  storage: reduxStorage,
  transforms: [compressor],
  debug: true,
  whitelist,
  timeout: 10000,
};

const persistedReducer = persistReducer(config, rootReducer as any);

export type RootReducerType = ReturnType<typeof rootReducer>;

export { rootReducer, persistedReducer };
