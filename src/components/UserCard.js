import React from 'react';
import { Avatar } from 'antd';
import './UserCard.scss';

const UserCard = ({ user, rightSlot }) => {
  let cName = 'user-card';
  if (user.isOnline) {
    cName += ' active';
  }
  return (
    <li className="user-card-container">
      <div className={cName}>
        <Avatar src={user.avatar} />
        <span className="user-name">{user.name}</span>
        <div className="right-slot">{rightSlot}</div>
      </div>
    </li>
  );
};

export default UserCard;
