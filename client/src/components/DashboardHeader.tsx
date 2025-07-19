// import CustomButton from "./CustomButton";
// import SearchBar from "./SearchBar";
import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../redux/user/selectors";
import CustomButton from "./CustomButton";
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import Logo from "./Logo";
import { CgMenu } from "react-icons/cg";
import { TbMessageDots } from "react-icons/tb";
import MessageSidebar from "./sidebars/MessageSidebar";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const Header = ({ expanded, setExpanded }: {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
    className?: string
}) => {
    const [profile, setProfile] = useState(false);
    const userInfo = useSelector(selectUserInfo);
    return (
        <header className="w-full flex items-center justify-between p-4 py-2 gap-4 bg-gray-50 shadow-sm">
            <div className="flex items-center gap-2 w-fit">
                <button
                    className={`w-full h-[45px] p-2 text-gray-600 rounded-md hover:bg-[#efefef] text-xl
                        items-center gap-2 cursor-pointer transition-all duration-200 ease-in-out active:scale-90
        `}
                    onClick={() => setExpanded(!expanded)}
                >
                    <CgMenu className="text-2xl" />
                </button>
                <Logo expanded={true} />
            </div>
            {/* <SearchBar style={{ marginRight: "50px" }} /> */}
            <div className="flex items-center gap-5 mr-[20px]">
                <LanguageSelector />
                <TooltipProvider>
                    <div className="relative">
                        <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0 animate-ping"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0"></div>
                        <IoNotificationsOutline className="text-2xl text-gray-700" />
                    </div>
                    <MessageSidebar />
                </TooltipProvider>
            </div>
            {/* <CustomButton intent={'style'} size={'md'}>Upgrade ✨</CustomButton> */}
        </header>
    );
};

export default Header;
