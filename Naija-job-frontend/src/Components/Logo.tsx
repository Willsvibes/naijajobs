import { Briefcase } from 'lucide-react'
import React from 'react'

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
        <Briefcase size={20} className="text-black" />
      </div>
      <div>
        <h1 className="text-xl font-bold bg-linear-to-r from-amber-400 to-yellow-300 text-transparent bg-clip-text leading-tight">
          HustleFinder
        </h1>
        <p className="text-[10px] text-slate-500 font-medium tracking-wide">Find your next gig</p>
      </div>
    </div>
  )
}

export default Logo