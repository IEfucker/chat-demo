import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';
import MessagePop from './MessagePop';
import UserList from './UserList';
import './Room.scss';

const { Search } = Input;

const Room = withRouter(({ friends, user, chatLog, rooms, actions, match }) => {
  const allUsers = [...friends, user];
  const ownerId = user.id;
  const roomId = match.params.id;
  if (!rooms || !rooms.length) return null;
  const room = rooms.filter(r => {
    return r.roomId === roomId;
  })[0];
  const membersId = room.users.map(u => {
    return u.id;
  });
  const users = allUsers.filter(f => {
    return membersId.includes(f.id);
  });
  // 暂约定每次进入房间先清除再取log
  // 清除store中的chatLog
  // useEffect(() => {
  //   actions.cleanChatLog();
  // }, [actions]);
  // // 获取chatLog
  // useEffect(() => {
  //   actions.getChatLog(roomId).then(() => {});
  // }, [actions, roomId]);
  const sendMessage = message => {
    actions.sendMessage(ownerId, roomId, message);
  };

  return (
    <div className="room-container">
      <div className="panel left">
        <div className="chat-window">
          {chatLog.map(log => {
            if (!users || !users.length) return null;
            const curUser = users.filter(u => {
              return u.id === log.userId;
            })[0];
            const isOwner = !!(log.userId === ownerId);
            return (
              <MessagePop
                key={log.id}
                user={curUser}
                log={log}
                isOwner={isOwner}
                isSending={log.isSending}
              />
            );
          })}
        </div>
        <div className="chat-input">
          <Search
            placeholder=""
            enterButton="发送"
            size="large"
            onSearch={value => sendMessage(value)}
          />
        </div>
      </div>
      <div className="panel right">
        <div className="chat-user-list-container">
          <UserList title="房间用户" users={users} />
        </div>
      </div>
    </div>
  );
});

export default Room;
