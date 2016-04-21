import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/reducers.js';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
  ,loggerMiddleware // neat middleware that logs actions
)(createStore);

export default createStoreWithMiddleware(rootReducer);
