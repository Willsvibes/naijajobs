import React from 'react'
import NavBar from '../LandingPage component/navBar'
import { Outlet } from 'react-router'
const AuthLayout: React.FC = () => {
  return (
    <div className=' bg-slate-200'>
        <div>
           < NavBar/> 
        </div>
        <div>

        <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout