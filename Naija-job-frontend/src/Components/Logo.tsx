import { Briefcase } from 'lucide-react'
import React from 'react'

const Logo: React.FC = () => {
  return (
     <div className="mb-8 px-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Briefcase size={20} className="text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 text-transparent bg-clip-text">
                HustleFinder
              </h1>
              <p className="text-xs text-slate-500">Find your next gig</p>
            </div>
          </div>
        </div>

  )
}

export default Logo