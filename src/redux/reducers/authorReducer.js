import * as types from "../actions/actionTypes";
// import initialState from "./initialState";
const initialState = {
  authors: []
};

export default function authorReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return {
        ...state,
        authors: action.authors
      };

    // case types.LOAD_AUTHORS_SUCCESS:
    //   return [...state, { authors: action.authors }];
    default:
      return state;
  }
}
