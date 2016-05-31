import Request from 'superagent';
import AccountActions from '../actions/accountActions';
import Promise from 'bluebird';
import Cache from '../services/cache';

const API_URL = 'http://82.146.56.118:8083//api';

const makeRequest = (attrs) => {
  const {type, url, params, options} = attrs;

  return new Promise((resolve, reject) => {
    let requestUrl = API_URL + url;
    let request;
    switch (type) {
      case 'POST':
        request = Request.post(requestUrl);
        break;
      case 'PUT':
        request = Request.put(requestUrl);
        break;
      case 'HEAD':
        request = Request.head(requestUrl);
        break;
      case 'DELETE':
        request = Request.del(requestUrl);
        break;
      default:
        request = Request.get(requestUrl);
        break;
    }

    var token = Cache.get('token');
    if (token) {
      request.set('Authorization', 'Bearer ' + token);
    }

    if (params) {
      if (type === 'GET') {
        request.query(params);
      } else {
        request.send(params);
        request.send(params);
      }
    }
    console.log(options);

    request
      .end((err, res) => {
        if (err) {
          if (!(options && options.noLogout) && res.statusCode === 401) {
            AccountActions.logout();
          }
          reject(err);
        } else {
          let responseBody = res.body;
          resolve(responseBody);
        }
      });
  });
};

const Api = {
  get: (url, params) => {
    return makeRequest({
      type: 'GET',
      url: url,
      params: params
    });
  },

  head: (url, options) => {
    return makeRequest({
      type: 'HEAD',
      url: url,
      options: options
    });
  },

  post: (url, params) => {
    return makeRequest({
      type: 'POST',
      url: url,
      params: params
    });
  },

  put: (url, params) => {
    return makeRequest({
      type: 'PUT',
      url: url,
      params: params
    });
  },

  delete: (url, params) => {
    return makeRequest({
      type: 'DELETE',
      url: url,
      params: params
    });
  }
};

export default Api;