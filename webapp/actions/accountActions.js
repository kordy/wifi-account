import AccountConstants from '../constants/accountConstants';
import RouterActions from './routerActions';
import LoaderActions from './loaderActions';
import Cache from '../services/cache';
import Api from '../services/api';
import Promise from 'bluebird';
import {dispatch} from '../store/store';

const logout = (noRedirect = false) => {
  if (Cache.get('token')) {
    LoaderActions.show();
    Api.head('/logout', {noLogout: true})
      .finally(() => {
        Cache.remove('token');
        LoaderActions.hide(100);
        if (!noRedirect && RouterActions.path() !== '/login') {
          RouterActions.go('/login');
        }
      });
  } else
  if (!noRedirect && RouterActions.path() !== '/login') {
    RouterActions.go('/login');
  }
};

const checkSuccess = () => {
  dispatch({
    type: AccountConstants.AUTH_SUCCESS
  });
};

const checkFail = () => {
  dispatch({
    type: AccountConstants.AUTH_FAIL
  });
};

const setChecked = () => {
  dispatch({
    type: AccountConstants.CHECKED
  });
};

const requestAccount = () => {
  dispatch({
    type: AccountConstants.REQUEST_ACCOUNT
  });
};

const requestAccountSuccess = (account) => {
  dispatch({
    type: AccountConstants.REQUEST_ACCOUNT_SUCCESS,
    account: account
  });
};

const requestAccountError = () => {
  dispatch({
    type: AccountConstants.REQUEST_ACCOUNT_FAIL
  });
};

const fetchAccount = () => {
  return dispatch(() => {
    requestAccount();
    return Api.get(`/account`)
      .then((response) => {
        requestAccountSuccess(response);
      })
      .catch(() => {
        requestAccountError();
      })
  });
};

const login = (values) => {
  return new Promise((resolve, reject) => {
    LoaderActions.show();
    Api.post('/authorize', {...values}).then((response) => {
      if (response.result) {
        checkSuccess();
        Cache.set('token', response.token);
        RouterActions.go('/');
        fetchAccount();
        resolve();
      } else {
        reject({ password: 'Неверный пользователь или пароль' })
      }
    }).catch((response) => {
      reject({ password: 'Неверный пользователь или пароль' })
    }).finally((response) => {
      LoaderActions.hide();
    });

  });
};

const check = () => {
  return new Promise((resolve, reject) => {
    if (!Cache.get('token')) {
      reject();
      checkFail();
    } else {
      Api.head('/checkSession', {noLogout: true}).then((response) => {
        resolve();
        checkSuccess();
      }).catch((response) => {
        reject();
        checkFail();
      });
    }
  });
};

export default {
  check,
  setChecked,
  fetchAccount,
  login,
  logout
};
