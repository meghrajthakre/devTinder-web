import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';
import Feed from './components/Feed';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import EditePage from './components/EditePage';
const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <Routes>
          <Route>
            <Route path='/' element={<Body />}>
              <Route path='/feed' element={<Feed />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/edit' element={<EditePage />} />
            </Route>
              <Route path='/login' element={<Login />} />

          </Route>z
        </Routes>
      </Provider>
    </div>
  )
}

export default App
