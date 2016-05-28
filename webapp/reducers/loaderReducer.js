import LoaderConstants from '../constants/loaderConstants';

const initialState = {
  isShow: false
};

export default function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case LoaderConstants.LOADER_SHOW:
      return Object.assign({}, state, {
        isShow: true
      });

    case LoaderConstants.LOADER_HIDE:
      return Object.assign({}, state, {
        isShow: false
      });

    default:
      return state;
  }

}