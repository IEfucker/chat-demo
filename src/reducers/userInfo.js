import * as types from '../constants';

const initialState = {
  user: null,
  friends: null
};

export default function userInfo(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_DONE: {
      const user = action.data;
      let { friends } = state;
      if (friends && friends.length) {
        // 在friends中剔除当前登陆分配的用户
        friends = friends.filter(f => f.id !== user.id);
      }
      return { ...state, user, friends };
    }

    case types.CONNECT_SOCKET_DONE: {
      const user = action.data;
      const { user: curUser } = state;
      curUser.isOnline = true;
      curUser.socketId = user.socketId;
      return { ...state, user: curUser };
    }

    case types.RECEIVE_FRIENDS: {
      const { user } = state;
      let { friends } = action;
      if (user) {
        // 在friends中剔除当前登陆分配的用户
        friends = friends.filter(f => f.id !== user.id);
      }
      return { ...state, friends };
    }

    case types.ONLINE: {
      const { user } = action.data;
      // console.log(user, state.user);
      if (user.id === state.user.id) return state;
      const friends = state.friends.map(f => {
        if (f.id === user.id) return { ...f, isOnline: true };
        return f;
      });
      // console.log(friends);
      return { ...state, friends };
    }

    case types.OFFLINE: {
      const { user } = action.data;
      if (user.id === state.user.id) {
        return { ...state, user: null };
      }
      const friends = state.friends.map(f => {
        if (f.id === user.id) return { ...f, isOnline: false };
        return f;
      });
      return { ...state, friends };
    }
    case types.CREATE_ROOM_DONE: {
      const { user } = action.data;
      if (user.id === state.user.id) return { ...state, user };
      return state;
    }
    case types.JOIN_ROOM_DONE: {
      const { user } = action.data;
      // 如果是当前用户，进入房间，替换user
      if (user.id === state.user.id) return { ...state, user };
      return state;
    }
    case types.LEAVE_ROOM_DONE: {
      const { user } = action.data;
      // 如果是当前用户，进入房间，替换user
      if (user.id === state.user.id) return { ...state, user };
      return state;
    }
    default:
      return state;
  }
}
