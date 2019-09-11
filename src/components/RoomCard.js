import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Icon, Avatar } from 'antd';
import './RoomCard.scss';

const { Meta } = Card;

const RoomCard = withRouter(({ room, owner, history }) => {
  function enterRoom(roomId) {
    history.push(`/room/${roomId}`);
  }
  return (
    <div className="room-card-container">
      <div className="room-card">
        <Card
          style={{ width: 250 }}
          cover={
            <div className="room-cover">
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
              <span className="room-name">房间名称：{room.name}</span>
            </div>
          }
          actions={[
            <Icon
              type="enter"
              onClick={() => {
                enterRoom(room.id);
              }}
            />
          ]}
        >
          <Meta
            avatar={<Avatar src={owner.avatar} />}
            title=""
            description={
              <div className="room-info">
                <span className="room-owner">房主：{owner.name}</span>
                <span className="room-number">房间号：{room.NO}</span>
                <span className="room-member-count">
                  当前人数：{room.members.length}
                </span>
              </div>
            }
          />
        </Card>
      </div>
    </div>
  );
});

export default RoomCard;
