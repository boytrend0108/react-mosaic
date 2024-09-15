import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { companyApi } from '../entities/Company';

type RootState = {
  [companyApi.reducerPath]: ReturnType<typeof companyApi.reducer>;
};

export type AppDispatch = typeof store.dispatch;

export const store: EnhancedStore<RootState, any, []> = configureStore({
  reducer: {
    [companyApi.reducerPath]: companyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companyApi.middleware),
});

// Setup listeners for RTK Query
setupListeners(store.dispatch);
