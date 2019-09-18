import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Button, Layout } from 'antd';
import UserListContainer from '../containers/UserListContainer';
import NavHeader from './NavHeader';
import HallContainer from '../containers/HallContainer';
import RoomContainer from '../containers/RoomContainer';
import NoMatch from './NoMatch';
import './App.scss';

const { Content, Header, Sider } = Layout;

const App = withRouter(({ friends, user, actions }) => {
  const sideBarCName = '';
  // if (location.pathname !== '/') {
  //   sideBarCName += ' folded';
  // }
  useEffect(() => {
    actions.login().then(res => {
      actions.getFriends().then(() => {
        actions.connectSocket(res.data.id);
      });
    });
  }, [actions]);

  if (!friends || !friends.length) {
    return null;
  }
  return (
    <div className="App">
      <Layout>
        <Sider className={sideBarCName}>
          <UserListContainer
            title="好友列表"
            rightSlot={
              <Button type="primary" size="small">
                邀请
              </Button>
            }
          />
        </Sider>
        <Layout>
          <Header className="nav-header">
            <NavHeader user={user} exitRoom={actions.leaveRoom} />
          </Header>
          <Content className="main">
            <Switch>
              <Route
                exact
                path="/"
                component={() =>
                  // 处于某一房间，就不允许访问大厅
                  user.inRoom ? (
                    <Redirect to={`/room/${user.inRoom}`} />
                  ) : (
                    <HallContainer />
                  )
                }
              />
              <Route
                path="/room/:id"
                component={() =>
                  // 处于某一房间，就不允许访问大厅
                  user.inRoom ? <RoomContainer /> : <Redirect to="/" />
                }
              />
              <Route component={NoMatch} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
});

export default App;
