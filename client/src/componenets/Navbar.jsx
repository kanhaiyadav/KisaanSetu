import { useState } from 'react';
// import { close, menu} from '../assets';
import Logo from '../componenets/Logo';
import { navLinks } from "../constant";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
  return (
    <div>
     <nav className="w-full flex py-6 justify-between
         items-center navbar">
         <Logo/>
          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            {navLinks.map((nav,index) => (
              <li
               key={nav.id}
              className={`font-poppins font-normal
               cursor-pointer text-[16px] ${index===navLinks.length-1 ? "mr-0" : "mr-10"} text-black`}
              >
              <a href="{`#${nav.id}`}">
                {nav.title}
              </a>
              </li>
            ))}
          </ul>

          <div className="sm:hidden flex flex-1 justify-end items-center">
                <img src='/menu.svg'
                  alt="menu"
                  className="w-[28px] h-[28px] object-contain"
                  onClick={()=>setToggle((prev)=>!prev)}
                />

          </div>
            
         


        </nav>
   

</div>
  )
}

export default Navbar
