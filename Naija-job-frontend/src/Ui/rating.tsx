import { Star } from "lucide-react"

const Rating = () => {
  return (
    <>

      <div className="flex gap-0.5 items-center">
         <h1 className="text-lg"> 5.0</h1>
       {[...Array(5)].map((_,index) =>
        <Star key={index}  className="fill-yellow-400 text-yellow-400 h-5 w-5"/>
    )}
    </div>
    </>
  )
}

export default Rating