import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logger} from 'redux-logger'; // Only for development

import authReducer from './features/auth/store/AuthReducer';

const rootReducer = combineReducers({
  auth: authReducer,
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
