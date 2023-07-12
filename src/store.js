import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logger} from 'redux-logger'; // Only for development

import authReducer from './features/auth/store/AuthReducer';
import homeReducer from './features/home/store/HomeReducer';
import profileReducer from './features/profile/store/ProfileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  profile: profileReducer,
  // Add other reducers here
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Add any persist configuration options here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

if (__DEV__) {
  middleware.push(logger);
}

const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export {store, persistor};
