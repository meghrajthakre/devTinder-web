import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation()
  const user = useSelector(store => store.user)

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + '/profile', {
        withCredentials: true
      })

      dispatch(addUser(res.data))
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate('/login');
      }
      console.log(error);
    }
  }

  useEffect(() => {
    if (location.pathname === "/login") return;
    if (!user) fetchData();
  }, [location.pathname])

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
