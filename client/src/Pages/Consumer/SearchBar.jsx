import { IoSearchOutline } from "react-icons/io5";

const SearchBar = () => {
    return (
        <div className={`flex flex-1 max-w-[700px] shadow-xl rounded-md overflow-hidden focus-within:outline-[3px]
        focus-within:outline-secondary focus-within:outline
        `}>
            <IoSearchOutline className="text-4xl h-full text-gray-600 p-2 bg-white" />
            <input type="text" placeholder="Search for products..."
                className={`border-none outline-none bg-white p-2 text-lg font-poppins text-gray-700
                flex-1
                `} />
            <button className="bg-secondary text-white p-2 grow-0 text-lg hover:bg-orange-500">Search</button>
        </div>
    )
}

export default SearchBar;