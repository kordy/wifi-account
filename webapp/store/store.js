import { createStore, applyMiddleware } from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/reducers.js';
import {createHashHistory} from 'history';
// Apply the middleware to the store

const reduxRouterMiddleware = routerMiddleware(createHashHistory());

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  reduxRouterMiddleware,
  thunkMiddleware // lets us dispatch() functions
  ,loggerMiddleware // neat middleware that logs actions
)(createStore);


const configureStore = (initialState) => {
  return createStoreWithMiddleware(rootReducer, initialState);
};

const store = configureStore();

export default createStoreWithMiddleware(rootReducer);
export default store;
export const dispatch = store.dispatch;