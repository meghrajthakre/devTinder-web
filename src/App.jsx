import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';
import Feed from './components/Feed';
import EditePage from './components/EditePage';
import Connections from './components/Connections';
import RequestsPage from './components/RequestsPage';
import SignUpPage from './components/SignUpPage';

import appStore from './utils/appStore';
import { socket } from './utils/socket'; 
import Chats from './components/chats';

const App = () => {

  // 🔐 Connect socket AFTER app loads
  useEffect(() => {

    // 1️⃣ Read token from cookie
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    console.log(token)

    // 2️⃣ If user is logged in, connect socket
    if (token) {
      socket.auth = { token }; // send token to backend
      socket.connect();        // open WebSocket connection
      console.log("Socket connected from App.jsx");
    }

    // 3️⃣ Disconnect socket on logout / app close
    return () => {
      socket.disconnect();
      console.log("Socket disconnected from app jsx");
    };

  }, []);

  return (
    <Provider store={appStore}>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path='/' element={<Body />}>
          <Route path='feed' element={<Feed />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profileEdit' element={<EditePage />} />
          <Route path='connections' element={<Connections />} />
          <Route path='requests' element={<RequestsPage />} />
          <Route path='chats' element={<Chats />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </Provider>
  );
};

export default App;
