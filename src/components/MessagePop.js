import React from 'react';
import { Avatar, Icon } from 'antd';
import './MessagePop.scss';

const MessagePop = ({ user, log, isOwner, isSending }) => {
  let cName = 'user';
  if (isOwner) {
    cName += ' isOwner';
  }
  return (
    <div className="message-container">
      <div className={cName}>
        <Avatar src={user.avatar} />
        <div className="message">{log.message}</div>
        {isSending && <Icon className="loading" type="loading" />}
      </div>
    </div>
  );
};

export default MessagePop;
