import React from 'react'

import { Route, Routes } from 'react-router-dom';
import Body from './components/Body';
const App = () => {
  return (
    <div>
      <Routes>
        <Route>
          <Route path="/" element={<Body/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
