import { NavLink } from "react-router"
import Logo from "../Components/Logo"
import { navItems } from "./NavbarList"

const NavBar = () => {
  return (
    <div className="flex w-fit justify-between  h-16 items-center">
      <div className="flex justify-center h-10">
        <Logo />
        </div>
        
        <ul className="flex items-center list-none text-slate-600 space-x-25 pl-[30vh]  text-2xl">
          {navItems.map((items) =>(
            <NavLink to={items.link}>
            <li key={items.name}
              
                 className="hover:text-gray-600 transition-colors duration-200"
               >
                 {items.name}
            </li>
            </NavLink>
          ))}
        </ul>
    </div>
  )
}

export default NavBar