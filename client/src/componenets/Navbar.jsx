import { useState } from 'react';
import Logo from '../componenets/Logo';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t } = useTranslation('landingPage');
    const navLinks = t('navLinks', { returnObjects: true });
    const [toggle, setToggle] = useState(false);
    return (
        <div className='fixed top-0 left-0 pl-[130px] pr-[100px] w-full bg-white z-[1000]'>
            <nav className="w-full flex py-6 justify-between items-center navbar">
                <Logo />
                <ul className="list-none sm:flex hidden justify-end items-center flex-1 mr-5">
                    {navLinks.map((nav, index) => (
                        <li
                            key={nav.id}
                            className={`font-poppins font-normal
               cursor-pointer text-[16px] ${index === navLinks.length - 1 ? "mr-0" : "mr-10"} text-black`}
                        >
                            <a href="{`#${nav.id}`}" className={`relative hover:text-primary after:content-[""] after:absolute after:top-full
                            after:left-1/2 after:translate-x-[-50%] after:w-full after:h-[2px] after:transition-all after:duration-300
                            after:bg-primary after:scale-0 hover:after:scale-100
                            `}>
                                {nav.title}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <img src={toggle ? '/close.svg' : '/menu.svg'}
                        alt="menu"
                        className="w-[28px] h-[28px] object-contain"
                        onClick={() => setToggle((prev) => !prev)}
                    />
                </div>
                <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-Tprimary absolute top-20 right-0 mx-4
                my-2 min-w-[140px] rounded-xl sidebar`}>
                    <ul className="list-none flex flex-col justify-end items-center flex-1">
                        {navLinks.map((nav, index) => (
                            <li key={nav.id} className={`font-poppins font-normal
                        cursor-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mb-4'} text-black`}
                            >
                                <a href="{`#${nav.id}`}">
                                    {nav.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <LanguageSelector />

            </nav>


        </div>
    )
}

export default Navbar
