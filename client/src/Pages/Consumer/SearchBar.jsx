import { IoSearchOutline } from "react-icons/io5";
import { searchProduct } from "../../redux/product/product.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchProduct(search));
        navigate('./products');
    }

    return (
        <form className={`flex flex-1 max-w-[700px] shadow-[0_0_2px_1px_rgba(0,0,0,0.2)] rounded-md overflow-hidden focus-within:outline-[3px]
        focus-within:outline-primary focus-within:outline
        `} onSubmit={handleSubmit}>
            <IoSearchOutline className="text-2xl sm:text-4xl h-full text-gray-600 p-1 sm:p-2 bg-gray-100" />
            <input type="text" placeholder="Search for products..."
                className={` border-none outline-none bg-gray-100 p-1 sm:p-2 text-sm sm:text-lg font-poppins text-gray-700
                flex-1
                `} value={search} onChange={(event) => {
                    setSearch(event.target.value);
                }} />
            <button className="bg-primary text-white p-2 grow-0 text-sm sm:text-lg hover:bg-orange-500">Search</button>
        </form>
    )
}

export default SearchBar;