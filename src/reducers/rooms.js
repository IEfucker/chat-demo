import * as types from '../constants';

const initialState = [];

export default function rooms(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_ROOMS:
      return [...state, ...action.rooms];
    case types.ONLINE: {
      const { rooms: roomsData } = action.data;
      if (!roomsData) return state;
      // 检验去重
      const roomIds = state.map(r => r.roomId);
      const validRooms = roomsData.filter(r => {
        if (roomIds.includes(r.roomId)) return false;
        return true;
      });
      return [...state, ...validRooms];
    }
    case types.CREATE_ROOM_DONE:
      return [...state, action.data.room];
    case types.JOIN_ROOM_DONE: {
      const { room } = action.data;
      return state.map(r => {
        if (room.roomId === r.roomId) return room;
        return r;
      });
    }
    case types.LEAVE_ROOM_DONE: {
      const { roomId, room } = action.data;
      // 房间还在
      if (room) {
        return state.map(r => {
          if (roomId === r.roomId) {
            return room;
          }
          return r;
        });
      }
      // 房间被销毁
      return state.filter(r => {
        return r.roomId !== roomId;
      });
    }
    default:
      return state;
  }
}
