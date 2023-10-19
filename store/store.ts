import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { rtkQueryErrorLogger } from '@/middleware/middleware';
import { clientApi } from '@/services/client.service';
import clientReducer from '@/slices/client.slice';
import { authApi } from '@/services/auth.service';
import authReducer from '@/slices/auth.slice';
import blogReducer from '@/slices/blog.slice';
import { blogApi } from '@/services/blog.service';

const rootReducer = combineReducers({
  blog: blogReducer,
  [blogApi.reducerPath]: blogApi.reducer,
  // client: clientReducer,
  // [clientApi.reducerPath]: clientApi.reducer,
  // auth: authReducer,
  // [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // Thêm api middleware để enable các tính năng như caching, invalidation, polling của rtk-query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogApi.middleware,
      // clientApi.middleware,
      // authApi.middleware,
      rtkQueryErrorLogger
    )
});

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Write Hello world function in javascript
