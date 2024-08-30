import { IoSearch } from "react-icons/io5";

const SearchBar = (props) => {
    return (
        <div className={`relative bg-white text-md text-gray-700 font-sans p-6 pt-2 pb-2 
        flex justify-between items-center rounded-lg overflow-hidden border-primary border-2`} {...props}>
            <input type="text" placeholder="Search..." className="outline-none border-none" />
            <div className="absolute top-0 right-0 h-full w-[40px] bg-primary flex justify-center items-center">
                <IoSearch className="text-xl text-white" />
            </div>
        </div>
    );
}

export default SearchBar;