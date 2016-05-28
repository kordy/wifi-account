import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import {routerReducer} from 'react-router-redux';

import loaderReducer from './loaderReducer';
import accountReducer from './accountReducer';
const rootReducer = combineReducers({
  form,
  routing: routerReducer,
  loader: loaderReducer,
  account: accountReducer
});

export default rootReducer;