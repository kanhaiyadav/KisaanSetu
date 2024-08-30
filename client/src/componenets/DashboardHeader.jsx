// import CustomButton from "./CustomButton";
import SearchBar from "./SearchBar";
import { IoNotificationsOutline } from "react-icons/io5";

const Header = ({ title }) => {
    return (
        <header className="w-full flex items-center p-4 gap-4">
            <h1 className="text-3xl font-semibold text-gray-600 flex-1">{title}</h1>
            <SearchBar style={{ marginRight: "50px" }} />
            <div className="relative">
                <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0 animate-ping"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full absolute right-0 top-0"></div>
                <IoNotificationsOutline className="text-2xl text-gray-600" />
            </div>
            <div className={`mt-[auto] w-[40px] h-[40px] rounded-full border-white overflow-hidden
                        `}>
                <img src="/Farmer.png" alt="" className="w-full h-full" />
            </div>
            {/* <CustomButton intent={'style'} size={'md'}>Upgrade ✨</CustomButton> */}
        </header>
    );
}

export default Header;