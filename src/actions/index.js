import axios from 'axios';
import uuid from 'v4-uuid';
import * as types from '../constants';
import { apiHost } from '../base';
import Socket from './socket';

// 保存socket实例
let socket = null;

export const requestFriends = () => ({ type: types.REQUEST_FRIENDS });
export const receiveFriends = friends => ({
  type: types.RECEIVE_FRIENDS,
  friends
});
export const getFriends = () => {
  return dispatch => {
    dispatch(requestFriends());
    return axios
      .get(`${apiHost}/api/v1/users`)
      .then(
        res => res.data,
        // eslint-disable-next-line
        error => console.log('An error occurred.', error)
      )
      .then(data => dispatch(receiveFriends(data)));
  };
};
export const loginStart = () => ({ type: types.LOGIN });
export const loginDone = data => ({ type: types.LOGIN_DONE, data });
// 模拟登陆，返回一个随机用户
export const login = () => {
  return dispatch => {
    dispatch(loginStart());
    return axios
      .get(`${apiHost}/api/v1/user`, {
        withCredentials: true
      })
      .then(
        res => res.data,
        // eslint-disable-next-line
        error => console.log('An error occurred.', error)
      )
      .then(data => dispatch(loginDone(data)));
  };
};
export const connectSocketStart = () => ({ type: types.CONNECT_SOCKET_START });
export const connectSocketDone = data => ({
  type: types.CONNECT_SOCKET_DONE,
  data
});
export const connectSocket = userId => {
  return dispatch => {
    dispatch(connectSocketStart());
    socket = new Socket(userId, dispatch);
    socket.on('connect', () => {
      const { id } = socket;
      const curUserId = socket.query.userId;
      const user = {
        userId: curUserId,
        socketId: id
      };

      dispatch(connectSocketDone(user));
    });
  };
};
export const createRoomStart = () => ({ type: types.CREATE_ROOM_START });
export const createRoomDone = data => ({
  type: types.CREATE_ROOM_DONE,
  data
});
export const createRoom = () => {
  return dispatch => {
    dispatch(createRoomStart());
    socket.emit('room:create');
  };
};

export const joinInRoom = (roomId, userId) => {
  return () => {
    // dispatch(createRoomStart());
    socket.emit('room:join', {
      roomId,
      userId
    });
  };
};

export const leaveRoom = user => {
  return () => {
    const { id: userId, inRoom: roomId } = user;
    // console.log(userId, roomId);
    // dispatch(createRoomStart());
    socket.emit('room:leave', {
      roomId,
      userId
    });
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

export const sendMessage = (userId, roomId, message) => {
  const messageId = uuid();
  const params = {
    userId,
    roomId,
    message,
    isSending: true,
    id: messageId,
    // 用户客户端时间展示加数据，
    // 服务端数据覆盖timestamp
    timestamp: Date.now()
  };
  return dispatch => {
    dispatch({
      type: types.SEND_MESSAGE,
      params
    });
    // return (
    //   axios
    //     .post(`${apiHost}/api/sendmessage`, params)
    //     .then(
    //       res => res.data,
    //       // eslint-disable-next-line
    //       error => console.log('An error occurred.', error)
    //     )
    //     // 如果接口数据异常如何报错？？？？？？
    //     .then(data => dispatch({ type: types.SEND_MESSAGE_DONE, data }))
    // );

    const payload = params;
    socket.send(payload);
  };
};
