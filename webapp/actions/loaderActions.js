import LoaderConstants from '../constants/loaderConstants';
import {dispatch} from '../store/store';

function loaderShow() {
  dispatch({
    type: LoaderConstants.LOADER_SHOW
  });
}

function loaderHide() {
  dispatch({
    type: LoaderConstants.LOADER_HIDE
  });
}

export default {
  show: loaderShow,
  hide: loaderHide
};
