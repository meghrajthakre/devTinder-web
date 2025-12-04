import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  
  const fetchData = async () => {
    if (user) return;  // Already logged-in, no need to fetch again

    try {
      const res = await axios.get(BASE_URL + '/profile', {
        withCredentials: true
      })

      dispatch(addUser(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
