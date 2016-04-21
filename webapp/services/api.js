import Request from 'superagent';
import Promise from 'bluebird';

const API_URL = 'http://localhost:3031/api';

const makeRequest = (attrs) => {
  const {type, url, params} = attrs;

  return new Promise((resolve, reject) => {
    console.log(API_URL);
    let requestUrl = API_URL + url;
    let request;
    switch (type) {
      case 'POST':
        request = Request.post(requestUrl);
        break;
      case 'PUT':
        request = Request.put(requestUrl);
        break;
      case 'DELETE':
        request = Request.del(requestUrl);
        break;
      default:
        request = Request.get(requestUrl);
        break;
    }

    //var token = $.cookie('token');
    //
    //if (token) {
    //  //if (data) data.token = token;
    //  //else data = {token: token}
    //}
    //
    //var options = {
    //  url: getBasePath() + url,
    //  type: type,
    //  data: data,
    //  xhrFields: {
    //    withCredentials: true
    //  },
    //  beforeSend: function(xhr, data) {
    //    xhr.setRequestHeader('X-Access-Token', token);
    //  }
    //};

    if (params) {
      if (type === 'GET') {
        request.query(params);
      } else {
        request.send(params);
      }
    }

    request
      .end((err, res) => {
        if (err) {
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