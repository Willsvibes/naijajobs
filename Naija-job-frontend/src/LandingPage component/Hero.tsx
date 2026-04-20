import image2 from "../image2.png"
import React from 'react'
import { ChevronRight, Plus, } from "lucide-react"
import Sponsor from "./sponsor"
import Rating from "../Ui/rating"


const Hero:React.FC = () => {
  return (
 <div className=' flex w-full  h-[86vh] '>
    <section className='flex flex-col w-[50%] pl-6 pt-[20vh] '>
      <p className=' text-slate-600 font-bold text-sm'> Inclusive workplaces for all</p>

      <h1 className='text-7xl font-bold  text-black/50 pt-[1vh]'> <span className='bg-linear-to-r from-amber-400 to-yellow-300  text-transparent bg-clip-text '>Find Jobs</span> where <br /> diversity Thrives </h1>

      <p className='pt-4 text-slate-600 text-xl'>
        search for roles in organizations prioritizing diversity  and <br />inclusion that align with your values. 
      </p>

      <div className="pt-10">
      <h1 className="text-sm font-bold  flex text-amber-300 items-center"><ChevronRight color="gold" size={15} />100k<Plus color="gold" size={10}></Plus>
        <span className="flex text-black/50"> People Join</span>
       
      </h1>
      </div>
      <Sponsor />

      <Rating />
  </section>

  <section className='w-[50%]'>

  <img src={image2} alt=""  className=" w-full"/>
    
  </section>

 </div>
  )
}

export default Hero