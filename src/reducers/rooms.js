import * as types from '../constants';

const initialState = [];

export default function rooms(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_ROOMS:
      return [...state, ...action.rooms];

    default:
      return state;
  }
}
