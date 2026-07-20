import React from 'react'
import Navbar from './Navbar'
import MobileHeader from './MobileHeader'
import { Outlet } from 'react-router'

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-slate-950">
      <MobileHeader />
      
      <Navbar />
      
      <main className="flex-1 relative overflow-x-hidden">
    
        <div className="relative h-full">
          <Outlet />
        </div>
      </main>

      
    </div>
  )
}

export default MainLayout