import { combineReducers, configureStore } from '@reduxjs/toolkit' //combine reducers
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from './theme/themeSlice';


const rootReducer = combineReducers({//combine reducers
    user: userReducer,
    theme: themeReducer,
});

const persistConfig = {//persist config
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);//persisted reducer

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,// middleware to help prevent error using redux-persist
  }),
});

export const persistor = persistStore(store); //persistor to persist the store

