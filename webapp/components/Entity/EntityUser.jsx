'use strict';

import EntityBase from './EntityBase.jsx';

import Api from '../../services/api.js';
import apiReq from '../../services/apiReq.js';

class EntityUser extends EntityBase {
    constructor(){
        super();
    }

    postPhone(params, dataAcquireHandler, rejectHandler){
        var url = apiReq.getUrl.auth();
        Api.post(url, params).then(
            function(result){
                dataAcquireHandler(result)
            },
            function(status){
                this.showError(status);
                if('function' === typeof rejectHandler){
                    rejectHandler(status);
                }
            }
        );
    }
}

export default new EntityUser();