import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { companyApi } from '../../entities/Company';
import appReducer from '../../shared/store/appSlice';

export type RootState = {
  [companyApi.reducerPath]: ReturnType<typeof companyApi.reducer>;
  appReducer: ReturnType<typeof appReducer>;
};

export type AppDispatch = typeof store.dispatch;

export const store: EnhancedStore<RootState, any, []> = configureStore({
  reducer: {
    [companyApi.reducerPath]: companyApi.reducer,
    appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companyApi.middleware),
});

setupListeners(store.dispatch);
