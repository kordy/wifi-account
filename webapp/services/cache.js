let appStorage = {};

const Cache = {
  clear: () => {
    for (let i in localStorage) {
      if (i.indexOf('cacheId') > -1 || i.indexOf('cacheData') > -1) {
        localStorage.removeItem(i);
      }
    }
  },
  get: (id) => {
    try {
      if (typeof id !== 'string') {
        return;
      }

      let data = appStorage[id];

      if (typeof data !== 'undefined') {
        return JSON.parse(data);
      }

      if (!window.localStorage) {
        return;
      }

      data = window.localStorage.getItem(id);

      if (data === null) {
        return;
      }

      appStorage[id] = data;

      return JSON.parse(data);
    } catch (e) {
      return;
    }
  },

  set: (id, data, sessionOnly) => {
    try {
      if (typeof id !== 'string') {
        return false;
      }

      data = JSON.stringify(data);

      appStorage[id] = data;

      if (window.localStorage && !sessionOnly) {
        window.localStorage.setItem(id, data);
      }

      return true;
    } catch (e) {
      return false;
    }
  },

  remove: (id) => {
    try {
      if (typeof id !== 'string') {
        return false;
      }

      let data = appStorage[id];

      if (typeof data !== 'undefined') {
        delete appStorage[id];
      }

      if (window.localStorage) {
        window.localStorage.removeItem(id);
      }

      return true;
    } catch (e) {
      return false;
    }
  }
};

export default Cache;
