import * as ActionTypes from './ActionTypes';

export const comments = (state = {
    errMsg: null,
    comments: []
  }, action) => {
    switch(action.type) {
      case ActionTypes.ADD_COMMENTS:
        return {...state, errMsg: null, comments: action.payload};
      case ActionTypes.COMMENTS_FAILED:
        return { ...state, errMsg: null, comments: []};
      case ActionTypes.ADD_COMMENT:{
        action.payload.id = state.comments.length;
        return {...state, errMsg: null, comments: state.comments.concat(action.payload)};
      }
      default:
        return state;
    }
}
