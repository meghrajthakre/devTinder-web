import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';
import Feed from './components/Feed';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import EditePage from './components/EditePage';
import { Toaster } from 'react-hot-toast';
import Connections from './components/Connections';
import RequestsPage from './components/RequestsPage';
import SignUpPage from './components/SignUpPage';
const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route>
            <Route path='/' element={<Body />}>
              <Route path='/feed' element={<Feed />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profileEdit' element={<EditePage />} />
              <Route path='/connections' element={<Connections />} />
              <Route path='/requests' element={<RequestsPage />} />
              
            </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUpPage />} />

          </Route>z
        </Routes>
      </Provider>
    </div>
  )
}

export default App
