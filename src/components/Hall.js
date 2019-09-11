import React from 'react';
import RoomCard from './RoomCard';
import './Hall.scss';

const Hall = ({ friends, rooms }) => {
  return (
    <div className="hall-container">
      <div className="hall">
        {rooms &&
          rooms.map(room => {
            if (!friends || !friends.length) return null;
            const owner = friends.filter(user => {
              return user.id === room.owner;
            })[0];
            return <RoomCard key={room.id} room={room} owner={owner} />;
          })}
      </div>
    </div>
  );
};

export default Hall;
