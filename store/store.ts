import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { rtkQueryErrorLogger } from '@/middleware/middleware';
import { clientApi } from '@/services/client.service';
import clientReducer from '@/slices/client.slice';
import { authApi } from '@/services/auth.service';
import authReducer from '@/slices/auth.slice';
// import { courseApi } from '../pages/admin/Courses/course.service';
// import { categoryApi } from '../pages/admin/Categories/category.service';
// import { orderApi } from '../pages/admin/Orders/order.service';
// import courseReducer from '../pages/admin/Courses/course.slice';
// import orderReducer from '../pages/admin/Orders/order.slice';
// import categoryReducer from '../pages/admin/Categories/category.slice';

// import { userApi } from '../pages/admin/Users/user.service';
// import userReducer from '../pages/admin/Users/user.slice';


const rootReducer = combineReducers({

  client: clientReducer,
  [clientApi.reducerPath]: clientApi.reducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  
});

export const store = configureStore({
  reducer: rootReducer,
  // Thêm api middleware để enable các tính năng như caching, invalidation, polling của rtk-query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      clientApi.middleware,
      authApi.middleware,
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
