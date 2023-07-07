import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'

import { login, logout, FlushUserData,authReducer } from './slices/authSlice';
import { setUser,userReducer } from "./slices/userSlice";
import { categoryReducer } from "./slices/categorySlice";
import { questionReducer } from "./slices/questionSlice";
import { privilegeReducer} from "./slices/privilegeSlice";


const ENCRYPTION_KEY = 'my-secret-key';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth','user','category','question','privilege'],
  };


  const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    question: questionReducer,
    privilege: privilegeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
  
export const persistor = persistStore(store)
export {login,logout,setUser,FlushUserData}
