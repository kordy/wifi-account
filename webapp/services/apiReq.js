'use strict';

const apiReq = {
    urlKeys: {
        root: '',
        auth: 'auth'
    },
    getApiRoot(){
        return this.urlKeys.root;
    },
    getUrl: {
        auth : function(){
            var self = apiReq;

            return self.getApiRoot() + '/' + self.urlKeys.auth;
        }
    }
};

export default apiReq;