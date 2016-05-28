import AccountConstants from '../constants/accountConstants';

const initialState = {
  auth: false,
  checked: false,
  status: null,
  info: null
};

export default function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case AccountConstants.AUTH_SUCCESS:
      return Object.assign({}, state, {
        auth: true
      });

    case AccountConstants.AUTH_FAIL:
      return Object.assign({}, state, {
        auth: false
      });

    case AccountConstants.CHECKED:
      return Object.assign({}, state, {
        checked: true
      });

    case AccountConstants.REQUEST_ACCOUNT:
      return Object.assign({}, state, {
        status: 'fetching'
      });

    case AccountConstants.REQUEST_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        status: 'fetched',
        info: action.account
      });

    case AccountConstants.REQUEST_ACCOUNT_FAIL:
      return Object.assign({}, state, {
        status: 'error'
      });
    default:
      return state;
  }

}