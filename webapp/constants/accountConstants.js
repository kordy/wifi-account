import Utils from '../services/utils';

const AccountConstants = Utils.keyMirror('ACCOUNT', [
  'AUTH_SUCCESS',
  'AUTH_FAIL',
  'CHECKED',
  'REQUEST_ACCOUNT',
  'REQUEST_ACCOUNT_SUCCESS',
  'REQUEST_ACCOUNT_FAIL'
]);

export default AccountConstants;