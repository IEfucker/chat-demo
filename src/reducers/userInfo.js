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

    case types.RECEIVE_FRIENDS: {
      const { user } = state;
      let { friends } = action;
      if (user) {
        // 在friends中剔除当前登陆分配的用户
        friends = friends.filter(f => f.id !== user.id);
      }
      return { ...state, friends };
    }
    default:
      return state;
  }
}
