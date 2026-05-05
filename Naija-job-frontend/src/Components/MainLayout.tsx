import React from 'react'
import Navbar from './Navbar'
import MobileHeader from './MobileHeader'
import { Outlet } from 'react-router'

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-slate-950">
      <MobileHeader />
      
      {/* Sidebar - only visible on sm and up */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-1 relative overflow-x-hidden">
        {/* Content wrapper with subtle inner glow */}
        <div className="relative h-full">
          <Outlet />
        </div>
      </main>

      {/* Optional: Floating ambient orbs for extra flair */}
      {/* <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div> */}
    </div>
  )
}

export default MainLayout