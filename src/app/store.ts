import { configureStore, Store } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { persistedReducer, RootReducerType } from './root-reducer';

/**
 *  Configuration middleware
 * */
const middlewares: any = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

/**
 *  Configuration store
 * */
export const store: Store<RootReducerType> = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...middlewares),
});

/**
 *  get persistStore
 * */
export const persistor = persistStore(store, {});
