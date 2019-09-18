import io from 'socket.io-client';
import { socketHost } from '../base';
import * as types from '../constants';

const { log } = console;

export const online = data => ({ type: types.ONLINE, data });
export const offline = data => ({ type: types.OFFLINE, data });
export const createRoomDone = data => ({
  type: types.CREATE_ROOM_DONE,
  data
});
export const messageSended = data => ({
  type: types.MESSAGE_SENDED,
  data
});
export const onMessage = data => ({ type: types.ON_MESSAGE, data });
export const joinRoomDone = data => ({ type: types.JOIN_ROOM_DONE, data });
export const leaveRoomDone = data => ({ type: types.LEAVE_ROOM_DONE, data });

function Socket(uId, dispatch) {
  const query = {
    userId: uId
  };
  const socket = io(socketHost, {
    // 实际使用中可以在这里传递参数
    query,
    transports: ['websocket']
  });

  socket.on('connect', () => {
    const { id } = socket;
    const { userId } = socket.query;
    const user = {
      userId,
      socketId: id
    };

    log('#connect,', user);

    // 监听自身 id
    socket.on(id, msg => {
      log('#receive,', msg);
      const { action, payload } = msg;
      if (action === 'room:destroyed' || action === 'room:leave') {
        return dispatch(leaveRoomDone(payload));
      }
      return null;

      // if (payload.action === 'invite') {
      //   const { inviter, roomId } = payload;
      //   log('why!!!!');
      //   const result = confirm(`${inviter} invite you to join room ${roomId}`);
      //   if (result) {
      //     const msg = {
      //       roomId,
      //       userId,
      //       // 标记是否是受邀加入房间
      //       byInvite: true
      //     };
      //     socket.emit('room:join', msg);
      //   }
      // }
    });
  });

  socket.on('online', msg => {
    log('#online,', msg);
    const { action } = msg;
    switch (action) {
      case 'online':
        dispatch(online(msg));
        break;
      case 'offline':
        dispatch(offline(msg));
        break;
      default:
    }
  });

  socket.on('disconnect', msg => {
    log('#disconnect', msg);
  });

  socket.on('disconnecting', () => {
    log('#disconnecting');
  });

  socket.on('error', () => {
    log('#error');
  });

  socket.on('message', msg => {
    log('#message', msg);
    const { client } = msg.meta;
    if (client === socket.id) return dispatch(messageSended(msg.data.payload));
    return dispatch(onMessage(msg.data.payload));
  });

  socket.on('join', msg => {
    log('#join room,', msg);
    dispatch(joinRoomDone(msg.payload));
  });

  socket.on('room:created', msg => {
    log('#room:created,', msg);
    // const { action } = msg;
    dispatch(createRoomDone(msg.payload));
  });

  return socket;
}
export default Socket;
