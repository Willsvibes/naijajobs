import image3 from "../images/image3.png"
import image4 from "../images/image4.png"
import image5 from "../images/image5.png"
import image6 from "../images/image6.png"


const Sponsor = () => {
  return (
    <>
    <div className="flex pl-2 ">
        <span className="border-2 border-white rounded-full">
            <img src={image3} alt="" className="rounded-full w-9 h-9 bg-black" />
        </span>
        <span className="-ml-3.5 border-2 border-white rounded-full">
            <img src={image4} alt="" className="rounded-full w-9 h-9 bg-black" />
        </span>
        <span className="-ml-3.5 border-2 border-white rounded-full">
            <img src={image5} alt="" className="rounded-full  w-9 h-9 bg-black" />
        </span>
        <span className="-ml-3.5 border-2 border-white rounded-full">
            <img src={image6} alt="" className="rounded-full  w-9 h-9 bg-black" />
        </span>
    </div>
    </>
  )
}

export default Sponsor