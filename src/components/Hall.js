import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';
import RoomCardContainer from '../containers/RoomCardContainer';
import './Hall.scss';

const Hall = ({ actions, user, friends, rooms }) => {
  const allUsers = [...friends, user];
  let cName = 'hall';
  if (!rooms || !rooms.length) {
    cName += ' no-room';
  }
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    actions.createRoom();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="hall-container">
      <div className={cName}>
        {rooms && rooms.length ? (
          rooms.map(room => {
            if (!allUsers || !allUsers.length) return null;
            const owner = allUsers.filter(u => {
              return +u.id === +room.owner;
            })[0];
            return (
              <RoomCardContainer key={room.roomId} room={room} owner={owner} />
            );
          })
        ) : (
          <div className="center">
            <h4>还没有房间？</h4>
            <h4>创建一个自己的房间，邀请好友加入吧</h4>
            <Button type="primary" size="large" onClick={showModal}>
              创建房间
            </Button>

            <Modal
              title="创建房间"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>
                <Input placeholder="输入房间名称" />
              </p>
              <p>其他房间属性，如cover图片，是否有密码等</p>
              <p>省略...</p>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hall;
