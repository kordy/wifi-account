import LoaderConstants from '../constants/loaderConstants';
import {dispatch} from '../store/store';

function loaderShow() {
  dispatch({
    type: LoaderConstants.LOADER_SHOW
  });
}

function _loaderHide() {
  dispatch({
    type: LoaderConstants.LOADER_HIDE
  });
}

function loaderHide(delay) {
  delay = Number(delay);
  if (delay) {
    setTimeout(_loaderHide, delay);
  } else {
    _loaderHide();
  }
}

export default {
  show: loaderShow,
  hide: loaderHide
};
