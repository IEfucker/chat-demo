import * as types from '../constants';

const initialState = [];

export default function chatLog(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_CHAT_LOG:
      return [...state, ...action.chatLog];

    case types.SEND_MESSAGE:
      return [...state, action.params];

    case types.SEND_MESSAGE_DONE: {
      const { data } = action;
      return state.map(log => {
        return log.id === data.id ? data : log;
      });
    }
    case types.CLEAN_CHAT_LOG:
      return [];

    default:
      return state;
  }
}
