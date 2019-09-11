import * as types from '../constants';

const initialState = [];

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_FRIENDS:
      return [...state, ...action.friends];

    default:
      return state;
  }
}
