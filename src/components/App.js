import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Button, Layout } from 'antd';
import UserListContainer from '../containers/UserListContainer';
import NavHeader from './NavHeader';
import HallContainer from '../containers/HallContainer';
import RoomContainer from '../containers/RoomContainer';
import NoMatch from './NoMatch';
import './App.scss';

const { Content, Header, Sider } = Layout;

const App = withRouter(({ friends, actions }) => {
  const sideBarCName = '';
  // if (location.pathname !== '/') {
  //   sideBarCName += ' folded';
  // }
  useEffect(() => {
    actions.getFriends().then(() => {});
  }, [actions]);
  useEffect(() => {
    actions.getRooms().then(() => {});
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
            <NavHeader />
          </Header>
          <Content className="main">
            <Switch>
              <Route exact path="/" component={HallContainer} />
              <Route path="/room/:id" component={RoomContainer} />
              <Route component={NoMatch} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
});

export default App;
