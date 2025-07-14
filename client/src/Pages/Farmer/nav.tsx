import { useState } from "react";
import Logo from "../../components/Logo";
import NavItem from "../../components/NavItem";
// import CustomButton from "../../components/CustomButton";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { TbShoppingBag } from "react-icons/tb";
import { IoAnalytics } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import successAudio from '/success.mp3';
// import errorAudio from '/error.mp3';
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AiTwotoneShop } from "react-icons/ai";
import { TbShoppingBagCheck } from "react-icons/tb";
import { ClipboardPen } from "lucide-react";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { selectUserAvatar } from "@/redux/user/selectors";

const Nav = ({ expanded, setExpanded }: {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const success = new Audio(successAudio);
    const { currentUser, logout } = useAuth();
    const avatar = useSelector(selectUserAvatar)
    console.log("currentUser", currentUser);
    // const error = new Audio(errorAudio);

    return (
        <div
            className={`absolute bottom-0 xs:top-0 left-0 z-50 h-[60px] xs:h-full ${expanded ? "w-full" : "w-full xs:w-fit"
                } ${expanded ? "bg-transparent xs:bg-[rgba(0,0,0,0.2)]" : "bg-transparent"
                }`}
            onClick={() => {
                setExpanded(false);
            }}
        >
            <nav
                className={`${expanded ? "w-full xs:w-[235px]" : "w-full xs:w-[60px]"
                    } h-full
                box-border ${expanded ? "p-0 xs:p-2" : "p-0 xs:px-2 xs:py-2"
                    } pt-0 flex-col
                 transition-all duration-300 ease-in-out bg-white overflow-hidden flex
                `}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <section className="flex xs:flex-col justify-evenly xs:justify-start gap-4 py-2 xs:py-4 h-full">
                    <NavItem
                        to={"."}
                        onClick={() => {
                            setExpanded(false);
                        }}
                    >
                        <MdOutlineDashboard className={`ml-0 xs:ml-[4px]`} />
                        {expanded ? (
                            <span className={`overflow-hidden whitespace-nowrap`}>
                                Dashboard
                            </span>
                        ) : null}
                        {
                            <span
                                className={`absolute bottom-[-23px] xs:hidden left-[50%] translate-x-[-50%] text-gray-700 overflow-hidden whitespace-nowrap text-[10px]`}
                            >
                                Dashboard
                            </span>
                        }
                    </NavItem>
                    <NavItem
                        to={"products"}
                        onClick={() => {
                            setExpanded(false);
                        }}
                    >
                        <AiTwotoneShop
                            className={`ml-0 xs:ml-[2px] text-2xl `}
                        />
                        {expanded ? (
                            <span className={`overflow-hidden whitespace-nowrap`}>
                                Inventory
                            </span>
                        ) : null}
                        {
                            <span
                                className={`absolute bottom-[-23px] xs:hidden left-[50%] translate-x-[-50%] text-gray-700 overflow-hidden whitespace-nowrap text-[10px]`}
                            >
                                Products
                            </span>
                        }
                    </NavItem>
                    <NavItem
                        to={"sales"}
                        onClick={() => {
                            setExpanded(false);
                        }}
                    >
                        <ClipboardPen className={`ml-0 xs:ml-[3px] text-xl`} />
                        {expanded ? (
                            <span className={`overflow-hidden whitespace-nowrap`}>
                                Orders
                            </span>
                        ) : null}
                        {
                            <span
                                className={`absolute bottom-[-23px] xs:hidden left-[50%] translate-x-[-50%] text-gray-700 overflow-hidden whitespace-nowrap text-[10px]`}
                            >
                                orders
                            </span>
                        }
                    </NavItem>
                    <NavItem
                        to={"sales"}
                        onClick={() => {
                            setExpanded(false);
                        }}
                    >
                        <TbShoppingBagCheck className={`ml-0 xs:ml-[1px] text-2xl`} />
                        {expanded ? (
                            <span className={`overflow-hidden whitespace-nowrap`}>
                                Sales
                            </span>
                        ) : null}
                        {
                            <span
                                className={`absolute bottom-[-23px] xs:hidden left-[50%] translate-x-[-50%] text-gray-700 overflow-hidden whitespace-nowrap text-[10px]`}
                            >
                                Sales
                            </span>
                        }
                    </NavItem>
                    <NavItem
                        to={"sales-analytics"}
                        onClick={() => {
                            setExpanded(false);
                        }}
                    >
                        <TbBrandGoogleAnalytics className={`ml-0 xs:ml-[3px]`} />
                        {expanded ? (
                            <span className={`overflow-hidden whitespace-nowrap`}>
                                Sales Analytics
                            </span>
                        ) : null}
                        {
                            <span
                                className={`absolute bottom-[-23px] xs:hidden left-[50%] translate-x-[-50%] text-gray-700 overflow-hidden whitespace-nowrap text-[10px]`}
                            >
                                Analytics
                            </span>
                        }
                    </NavItem>
                    <NavItem
                        to={"profile"}
                        className={"hidden mt-auto xs:grid ml-[-7px]"}
                        noStyle
                    >
                        <Avatar>
                            <AvatarImage src={avatar ||currentUser?.photoURL || '/user.png'} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span
                            className={`${expanded ? "block" : "hidden"
                                } overflow-hidden whitespace-nowrap`}
                        >
                            {currentUser?.displayName || "Your Profile"}
                        </span>
                    </NavItem>
                </section>
            </nav>
        </div>
    );
}

export default Nav;