import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

const MainLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background accent */}
      {/* <div className="inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5 pointer-events-none"></div> */}
      
      {/* Subtle grid pattern overlay */}
      {/* <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 pointer-events-none"></div> */}
      
      <div className="relative sm:grid grid-cols-5 min-h-screen">
        {/* Navbar */}
        <div className="col-span-1">
          <Navbar />
        </div>

        {/* Main content area */}
        <main className="col-span-4 relative">
          {/* Content wrapper with subtle inner glow */}
          <div className="relative">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Optional: Floating ambient orbs for extra flair */}
      {/* <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000"></div> */}
    </div>
  )
}

export default MainLayout