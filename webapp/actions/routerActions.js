import store from '../store/store';
import { push } from 'react-router-redux'

const path = () => {
  const router = store.getState().routing.locationBeforeTransitions;
  return router.pathname;
};

const go = (newPath) => {
  if (path() !== newPath) store.dispatch(push(newPath));
};

export default {
  path,
  go
};
