import React from 'react';
import { Breadcrumb, Avatar, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './NavHeader.scss';

const getBreadcrumbByPath = path => {
  const pathSnippets = path.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    let name = '';
    if (_ === 'room') return null;
    if (index > 0 && pathSnippets[index - 1] === 'room') {
      name = `room: ${_}`;
    }
    // 其他path不处理

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{name}</Link>
      </Breadcrumb.Item>
    );
  });
  return extraBreadcrumbItems;
};
const NavHeader = withRouter(props => {
  const { location, user, exitRoom } = props;
  const extraBreadcrumbItems = getBreadcrumbByPath(location.pathname);
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);

  const handleExit = () => {
    exitRoom(user);
  };
  return (
    <div className="nav-container">
      <div className="breadcrumb-container">
        <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb>
      </div>
      {user.inRoom ? (
        <div className="exit-room">
          <Button type="primary" size="small" onClick={handleExit}>
            退出房间
          </Button>
        </div>
      ) : (
        ''
      )}

      <div className="user-state">
        <Avatar src={user.avatar} />
        <span className="user-name">{user.name}</span>
      </div>
    </div>
  );
});

export default NavHeader;
