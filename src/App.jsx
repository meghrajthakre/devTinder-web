import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Profile from './components/Profile';
import Login from './components/Login';
import Feed from './components/Feed';
const App = () => {
  return (
    <div>
      <Routes>
        <Route>
          <Route path='/' element={<Body />}>
            <Route path='/' element={<Feed />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
