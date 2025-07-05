import SearchBar from "./SearchBar";
import Logo from "@/components/Logo";
import { IoMdNotificationsOutline } from "react-icons/io";
import CustomButton from "@/components/CustomButton";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/user/selectors";
import { useState } from "react";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
// import { MdOutlineCollectionsBookmark } from "react-icons/pi";
import { TbMessageDots } from "react-icons/tb";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
    const [profile, setProfile] = useState(false);
    const userInfo = useSelector(selectUserInfo);
    return (
        <div className="w-full p-4 gap-4 sm:gap-10 flex justify-between bg-white">
            <div className="hidden lg:block">
                <Logo style={{ height: '45px' }} />
            </div>
            <SearchBar />
            <div className="flex items-center gap-5">
                <div className="relative hidden sm:block">
                    <MdOutlineCollectionsBookmark className="text-2xl text-gray-700" />
                </div>
                <div className="relative hidden sm:block">
                    <BsCart4 className="text-2xl text-gray-700" />
                </div>
                <div className="relative hidden sm:block">
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0 animate-ping"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0"></div>
                    <TbMessageDots className="text-2xl text-gray-700" />
                </div>
                <div className="relative hidden sm:block">
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0 animate-ping"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0"></div>
                    <IoMdNotificationsOutline className="text-2xl text-gray-700" />
                </div>
                <div className={`mt-[auto] w-[40px] h-[40px] bg-white p-1 rounded-full border-white cursor-pointer 
                        `}
                    onClick={() => setProfile(!profile)}
                >
                    <img src={userInfo.avatar} alt="" className="w-full h-full" />
                    {
                        profile &&
                        <div className="absolute left-0 top-0 bg-transparent w-screen h-screen z-10 cursor-default">
                            <motion.footer className={`absolute top-[90px] right-4  bg-white flex flex-col items-center justify-center gap-2
                        text-center shadow-[2px_2px_10px_5px_rgba(0,0,0,0.2)]  text-gray-600 rounded-lg
                        p-4 pt-0 z-10
                    `}
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className={`w-[80px] h-[80px] rounded-full border-[8px] border-white overflow-hidden
                            mt-[-30px] bg-gray-200 p-2
                        `}>
                                    <img src={userInfo.avatar} alt="" className="w-full h-full" />
                                </div>
                                <div className="max-w-full flex flex-col items-center">
                                    <h1 className="text-lg overflow-hidden whitespace-nowrap">{userInfo.name}</h1>
                                    <i className="whitespace-nowrap text-xs">{userInfo.email}</i>
                                    <CustomButton style={{ margin: "15px 0px" }}>Your Profile</CustomButton>
                                    <hr className="block sm:hidden w-full border-t border-gray-500 mb-1" />
                                    <div className="flex flex-col">
                                        <div className="flex sm:hidden items-center gap-2 w-full p-1 sm:p-2 rounded-lg hover:bg-gray-200"><MdOutlineCollectionsBookmark className="text-lg sm: text-gray-700" /> <span className="text-sm sm:text-md">Good Book</span></div>
                                        <div className="flex sm:hidden items-center gap-2 w-full p-1 sm:p-2 rounded-lg hover:bg-gray-200"><TbMessageDots className="text-lg sm:text-2xl text-gray-700" /> <span className="text-sm sm:text-md">Messages</span></div>
                                        <div className="flex sm:hidden items-center gap-2 w-full p-1 sm:p-2 rounded-lg hover:bg-gray-200"><IoMdNotificationsOutline className="text-lg sm:text-2xl text-gray-700" /> <span className="text-sm sm:text-md">Notifications</span></div>
                                    </div>
                                </div>
                            </motion.footer>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;