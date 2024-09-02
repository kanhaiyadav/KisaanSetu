import { useState } from "react";
import Logo from "../../componenets/Logo";
import NavItem from "../../componenets/NavItem";
import CustomButton from "../../componenets/CustomButton";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { TbShoppingBag } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "../../redux/user/user.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import successAudio from '/success.mp3';
import errorAudio from '/error.mp3';
import { toast } from "react-toastify";
import { selectUserInfo } from "../../redux/user/selectors";
import { useSelector } from "react-redux";

const Nav = () => {
    const [expanded, setExpanded] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const success = new Audio(successAudio);
    const error = new Audio(errorAudio);

    const userInfo = useSelector(selectUserInfo);
    
    return (
        <nav className={`${expanded ? 'w-[235px]' : 'w-[50px]'} h-full
                box-border ${expanded ? 'p-4' : 'p-1'} pt-0 flex flex-col
                pb-4 transition-all duration-300 ease-in-out bg-white rounded-r-3xl 
                overflow-hidden shadow-[0px_0px_3px_3px_rgba(0,0,0,0.2)]
                `}
        >
            <header className="border-b-[2px] border-dashed border-primary">
                <Logo expanded={expanded} setExpanded={setExpanded} />
            </header>
            <section className="flex flex-col gap-5 pt-4 pb-4">
                <NavItem to={'.'}>
                    <MdOutlineDashboard className={`${expanded ? '' : 'ml-[3px]'}`} />
                    {
                        expanded ?
                            <span className={`overflow-hidden whitespace-nowrap`}>Dashboard</span>
                            : null
                    }
                </NavItem>
                <NavItem to={'products'}>
                    <TbShoppingBag className={`${expanded ? '' : 'ml-[3px]'} text-2xl`} />
                    {
                        expanded ?
                            <span className={`overflow-hidden whitespace-nowrap`}>Products</span>
                            : null
                    }
                </NavItem>
                <NavItem to={'orders'}>
                    <BsCart4 className={`${expanded ? '' : 'ml-[3px]'}`} />
                    {
                        expanded ?
                            <span className={`overflow-hidden whitespace-nowrap`}>Orders</span>
                            : null
                    }
                </NavItem>
                <NavItem to={'sales-analytics'}>
                    <IoAnalytics className={`${expanded ? '' : 'ml-[3px]'}`} />
                    {
                        expanded ?
                            <span className={`overflow-hidden whitespace-nowrap`}>Sales Analytics</span>
                            : null
                    }
                </NavItem>
                <NavItem to={'logout'} onClick={(e) => {
                    e.preventDefault();
                    dispatch(signOut());
                    toast.success('Logged out successfully');
                    navigate('/signin');
                    success.play();
                }}
                >
                    <LuLogOut className={`${expanded ? '' : 'ml-[3px]'}`} />
                    {
                        expanded ?
                            <span className={`overflow-hidden whitespace-nowrap`}>LogOut</span>
                            : null
                    }
                </NavItem>
            </section>
        </nav>
    )
}

export default Nav;