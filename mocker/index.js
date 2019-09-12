/* eslint-disable */
const delay = require('mocker-api/utils/delay');

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';
const friends = [
  {
    id: '1',
    name: 'user1',
    isOnline: true,
    avatar: '/resources/images/avatar/boy.png'
  },
  {
    id: '2',
    name: 'user2',
    isOnline: true,
    avatar: '/resources/images/avatar/boy-1.png'
  },
  {
    id: '3',
    name: 'user3',
    isOnline: true,
    avatar: '/resources/images/avatar/boy-2.png'
  },
  {
    id: '4',
    name: 'user4',
    isOnline: true,
    avatar: '/resources/images/avatar/boy-3.png'
  },
  {
    id: '5',
    name: 'user5',
    isOnline: true,
    avatar: '/resources/images/avatar/boy-4.png'
  },
  {
    id: '6',
    name: 'user6',
    isOnline: true,
    avatar: '/resources/images/avatar/girl-1.png'
  },
  {
    id: '7',
    name: 'user7',
    isOnline: true,
    avatar: '/resources/images/avatar/girl-2.png'
  },
  {
    id: '8',
    name: 'user8',
    isOnline: true,
    avatar: '/resources/images/avatar/girl-3.png'
  },
  {
    id: '9',
    name: 'user9',
    avatar: '/resources/images/avatar/girl-4.png'
  },
  {
    id: '10',
    name: 'user10',
    avatar: '/resources/images/avatar/girl-5.png'
  },
  {
    id: '11',
    name: 'user11',
    avatar: '/resources/images/avatar/girl-6.png'
  },
  {
    id: '12',
    name: 'user12',
    avatar: '/resources/images/avatar/girl-7.png'
  }
];

const rooms = [
  {
    id: 11,
    name: '房间1',
    owner: '1',
    NO: 1,
    members: [1]
  },
  {
    id: 2,
    name: '房间2',
    owner: '2',
    NO: 2,
    members: [2, 6]
  },
  {
    id: 3,
    name: '房间3',
    owner: '3',
    NO: 3,
    members: [3, 4, 5]
  }
];
const chatLog = [
  {
    // userId
    userId: '1',
    message: 'Hello chat!',
    timestamp: '1567742902000',
    id: 'b95d2d22-360c-4000-ad12-eebaee3f5001'
  },
  {
    // userId
    userId: '7',
    message: 'Hi chat!',
    timestamp: '1567742995000',
    id: 'b95d2d22-360c-4000-ad12-eebaee3f5002'
  }
];

const proxy = {
  'GET /api/v1/user': (req, res) => {
    return res.json(friends[0]);
  },
  'GET /api/v1/users': (req, res) => {
    return res.json(friends);
  },
  'GET /api/rooms': (req, res) => {
    return res.json(rooms);
  },
  'GET /api/chatlog/:id': (req, res) => {
    console.log('req.params:', req.params);
    return res.json(chatLog);
  },
  'POST /api/sendmessage': (req, res) => {
    console.log('req.body:', req.body);
    const data = req.body;
    data.timestamp = Date.now();
    delete data.isSending;
    return res.json(data);
  },
  'GET /api/user/list/:id/:type': (req, res) => {
    const { type } = req.params;
    console.log('req.params:', req.params);
    if (type === 'webpack') {
      return res.status(403).json({
        status: 'error',
        code: 403
      });
    }
    return res.json([
      {
        id: 1,
        username: 'kenny',
        sex: 6
      },
      {
        id: 2,
        username: 'kenny',
        sex: 6
      }
    ]);
  },

  'POST /api/login/account': (req, res) => {
    const { password, username } = req.body;
    if (password === '888888' && username === 'admin') {
      return res.json({
        status: 'ok',
        code: 0,
        token: 'sdfsdfsdfdsf',
        data: {
          id: 1,
          username: 'kenny',
          sex: 6
        }
      });
    }
    return res.json({
      status: 'error',
      code: 403
    });
  },
  'DELETE /api/user/:id': (req, res) => {
    console.log('---->', req.body);
    console.log('---->', req.params.id);
    res.send({ status: 'ok', message: '删除成功！' });
  }
};
module.exports = noProxy ? {} : delay(proxy, 1000);
// module.exports = proxy;
