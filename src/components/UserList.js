import React from 'react';
import UserCard from './UserCard';
import './UserList.scss';

const UserList = ({ users, title, rightSlot }) => {
  return (
    <div className="list-container">
      <h3 className="title">{title}</h3>
      <ul className="user-list list">
        {users.map(user => {
          const curRightSlot = user.isOnline ? rightSlot : '';
          return (
            <UserCard key={user.id} user={user} rightSlot={curRightSlot} />
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
