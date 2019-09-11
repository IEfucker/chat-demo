import axios from 'axios';
import uuid from 'v4-uuid';
import * as types from '../constants';
import { apiHost } from '../base';

export const requestFriends = () => ({ type: types.REQUEST_FRIENDS });
export const receiveFriends = friends => ({
  type: types.RECEIVE_FRIENDS,
  friends
});
export const getFriends = () => {
  return dispatch => {
    dispatch(requestFriends());
    return axios
      .get(`${apiHost}/api/friends`)
      .then(
        res => res.data,
        // eslint-disable-next-line
        error => console.log('An error occurred.', error)
      )
      .then(data => dispatch(receiveFriends(data)));
  };
};
export const requestRooms = () => ({ type: types.REQUEST_ROOMS });
export const receiveRooms = rooms => ({
  type: types.RECEIVE_ROOMS,
  rooms
});
export const getRooms = () => {
  return dispatch => {
    dispatch(requestRooms());
    return axios
      .get(`${apiHost}/api/rooms`)
      .then(
        res => res.data,
        // eslint-disable-next-line
        error => console.log('An error occurred.', error)
      )
      .then(data => dispatch(receiveRooms(data)));
  };
};
export const requestChatLog = () => ({ type: types.REQUEST_CHAT_LOG });
export const receiveChatLog = chatLog => ({
  type: types.RECEIVE_CHAT_LOG,
  chatLog
});
// id - room id
export const getChatLog = id => {
  return dispatch => {
    dispatch(requestChatLog());
    return axios
      .get(`${apiHost}/api/chatLog/${id}`)
      .then(
        res => res.data,
        // eslint-disable-next-line
        error => console.log('An error occurred.', error)
      )
      .then(data => dispatch(receiveChatLog(data)));
  };
};

export const cleanChatLog = () => {
  return dispatch => {
    dispatch({ type: types.CLEAN_CHAT_LOG });
  };
};

export const sendMessage = (userId, message) => {
  const params = {
    userId,
    message,
    isSending: true,
    id: uuid(),
    // 用户客户端时间展示加数据，
    // 服务端数据覆盖timestamp
    timestamp: Date.now()
  };
  return dispatch => {
    dispatch({
      type: types.SEND_MESSAGE,
      params
    });
    return (
      axios
        .post(`${apiHost}/api/sendmessage`, params)
        .then(
          res => res.data,
          // eslint-disable-next-line
          error => console.log('An error occurred.', error)
        )
        // 如果接口数据异常如何报错？？？？？？
        .then(data => dispatch({ type: types.SEND_MESSAGE_DONE, data }))
    );
  };
};
