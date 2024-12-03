import { MdOutlineSearch } from "react-icons/md";
import { HiChevronUpDown } from "react-icons/hi2";

const OptionHeader = ({ onNew }) => {
    return (
        <div className="flex mx-4 gap-4 md:gap-8 items-center pb-4 pt-2">
            <button
                onClick={onNew}
                className="flex hover:bg-primary hover:text-white text-gray-600 gap-1 items-center justify-center px-2 py-0 border-2 hover:border-primary border-gray-600 rounded-lg">
                <span className="text-xl md:text-3xl ">+</span>
                <span className="text-md md:text-xl">New</span>
            </button>
            <div className="text-md md:text-xl text-gray-600 flex md:gap-1 items-center justify-center">
                <span>Sort</span>
                <span><HiChevronUpDown className="text-md" /></span>
            </div>
            <div className="text-md md:text-xl text-gray-600 flex md:gap-1 items-center justify-center">
                <span>View</span>
                <span><HiChevronUpDown className="text-md" /></span>
            </div>
            <div className="ml-auto   px-1 flex items-center justify-center outline outline-gray-600 focus-within:outline-gray-700 outline-2 rounded-lg">
                <input type="text" placeholder="Search" className="flex-1 text-md md:text-xl w-[100px] md:w-[200px] bg-transparent text-gray-600 px-2 py-1 border-none outline-none" />
                <MdOutlineSearch className="text-xl md:text-2xl text-gray-600" />
            </div>
        </div>
    );
}
    
export default OptionHeader;