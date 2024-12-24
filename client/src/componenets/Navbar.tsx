import { useState } from 'react';
import Logo from '../componenets/Logo';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import { Link } from 'react-scroll';
import { HiMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

export interface Navlink {
    id: string;
    title: string;
}


const Navbar = () => {
    const { t } = useTranslation('landingPage');
    const navLinks: Navlink[] = t('navLinks', { returnObjects: true }) as Navlink[];
    console.log(navLinks);
    const [toggle, setToggle] = useState(false);
    return (
        <div id="home" className='px-4 lg:px-[100px] w-full z-[1000]'>
            <nav className="w-full flex pt-6 justify-between items-center navbar">
                <Logo />
                <ul className="list-none md:flex hidden justify-end items-center gap-4 lg:gap-10 w-fit ml-auto mr-[20px]">
                    {navLinks.map((nav, index) => (
                        <li
                            key={nav.id}
                            className={`font-poppins font-normal
               cursor-pointer text-[16px] text-black`}
                        >
                            <Link to={nav.id} smooth duration={500} onSetActive={() => { console.log(`navigating to ${nav.id}`) }} containerId='landing-page' className={`relative hover:text-brown after:content-[""] after:absolute after:top-full
                            after:left-1/2 after:translate-x-[-50%] after:w-full after:h-[2px] after:transition-all after:duration-300
                            after:bg-brown after:scale-0 hover:after:scale-100
                            `}>
                                {nav.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <LanguageSelector />
                <div className="md:hidden flex justify-end items-center" onClick={() => setToggle((prev) => !prev)}>
                    {
                        toggle ? <CgClose className="text-3xl text-gray-700 cursor-pointer" /> : <HiMenuAlt3 className="text-3xl text-gray-700 cursor-pointer" />
                    }
                </div>
                <div className={`${toggle ? 'flex' : 'hidden'} p-2 bg-white shadow-2xl absolute top-20 right-0 mx-4
                my-2 min-w-[140px] rounded-xl sidebar z-20`}>
                    <ul className="list-none flex flex-col justify-end items-center flex-1">
                        {navLinks.map((nav, index) => (
                            <Link to={nav.id} key={nav.id} smooth duration={500} containerId='landing-page' onClick={() => setToggle((prev) => !prev)} className='w-full'>
                                <li className={`font-poppins font-normal
                        cursor-pointer text-[16px] text-black w-full hover:bg-gray-200 rounded-xl px-4 py-2`}
                                >
                                    {nav.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </nav>


        </div>
    )
}

export default Navbar
