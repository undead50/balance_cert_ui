import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from 'redux-persist';

import { login, logout, FlushUserData, authReducer } from './slices/authSlice';
import { setUser, userReducer } from './slices/userSlice';
import { categoryReducer } from './slices/categorySlice';
import { questionReducer } from './slices/questionSlice';
import { privilegeReducer } from './slices/privilegeSlice';
import { riskReducer } from './slices/riskSlice';
import { markReducer } from './slices/markSlice';
import { reportReducer } from './slices/reportSlice';
import { branchReducer } from './slices/branchSlice';
import { dashboardReducer } from './slices/dashboardSlice';
import { RiskDetailReducer } from './slices/RiskDetailSlice';
import { enc, AES } from 'crypto-js';
import { certificateReducer } from './slices/certificateSlice';
import { templateReducer } from './slices/templateSlice';
import { qrcertificateReducer } from './slices/qrcertificateSlice';


const secretKey = '081fbadce74f99af29c8280fce633fb9';

// Encrypt and decrypt functions using crypto-js
const encrypt = (data) =>
  AES.encrypt(JSON.stringify(data), secretKey).toString();
const decrypt = (cipherText) =>
  JSON.parse(AES.decrypt(cipherText, secretKey).toString(enc.Utf8));

const encryptor = createTransform(
  (inboundState, key) => encrypt(inboundState), // Encrypt the inbound state
  (outboundState, key) => decrypt(outboundState) // Decrypt the outbound state
);

const rootReducer = combineReducers({
  qrcertificate: qrcertificateReducer,
  certificate: certificateReducer,
  dashboard: dashboardReducer,
  auth: authReducer,
  user: userReducer,
  category: categoryReducer,
  question: questionReducer,
  privilege: privilegeReducer,
  risk: riskReducer,
  mark: markReducer,
  report: reportReducer,
  branch: branchReducer,
  riskdetail: RiskDetailReducer,
  template:templateReducer
});

const persistConfig = {
  key: 'root_riskassessment',
  storage,
  transforms: [encryptor], // Use the encryptTransform directly
  whitelist: [
    'auth',
    'user',
    'category',
    'question',
    'privilege',
    'risk',
    'mark',
    'report',
    'mydashboard',
    'dashboard',
    'riskdetail'
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true, // Disable Redux DevTools
});

export const persistor = persistStore(store);
export { login, logout, setUser, FlushUserData };
