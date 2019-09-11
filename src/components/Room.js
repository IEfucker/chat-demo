import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';
import MessagePop from './MessagePop';
import UserList from './UserList';
import './Room.scss';

const { Search } = Input;

const ownerId = '1';

const Room = withRouter(({ friends, chatLog, rooms, actions, match }) => {
  const roomId = match.params.id;
  if (!rooms || !rooms.length) return null;
  const room = rooms.filter(r => {
    return r.id === +roomId;
  })[0];
  const users = friends.filter(f => {
    return room.members.includes(+f.id);
  });
  // 缺少 currentUser
  // const currentUser
  // 暂约定每次进入房间先清除再取log
  // 清除store中的chatLog
  useEffect(() => {
    actions.cleanChatLog();
  }, [actions]);
  // 获取chatLog
  useEffect(() => {
    actions.getChatLog(roomId).then(() => {});
  }, [actions, roomId]);
  const sendMessage = message => {
    actions.sendMessage(ownerId, message);
  };

  return (
    <div className="room-container">
      <div className="panel left">
        <div className="chat-window">
          {chatLog.map(log => {
            if (!friends || !friends.length) return null;
            const user = friends.filter(u => {
              return u.id === log.userId;
            })[0];
            const isOwner = !!(log.userId === ownerId);
            return (
              <MessagePop
                key={log.id}
                user={user}
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
