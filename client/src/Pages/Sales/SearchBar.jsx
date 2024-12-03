import { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/product/product.selector";

const ProductSearch = ({ style, setProduct }) => {
    const products = useSelector(selectProducts);
    const [product, setProductName] = useState("");
    const [productList, setProductList] = useState(products);
    const [dropDownClicked, setDropDownClicked] = useState(false);

    useEffect(() => {
        setProductList(products);
    }, [products]);
    const handleChange = (e) => {
        const input = e.target.value.toLowerCase();
        setProductName(input);

        const newList = products
            .filter((prod) => prod.name.toLowerCase().includes(input))
            .sort((a, b) => {
                const aStartsWith = a.name.toLowerCase().startsWith(input);
                const bStartsWith = b.name.toLowerCase().startsWith(input);
                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
                return a.name.localeCompare(b.name);
            });

        setProductList(newList);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (productList.length === 0) {
            setProductList(products);
        }
        else {
            setProduct(productList[0]);
            setProductList(products);
        }
        setProductName("");
        setDropDownClicked(false);
        return;
    }
    return (
        <form style={style} className="flex items-center space-x-2 text-gray-700 relative w-full border-b-2 border-gray-600 focus-within:bg-gray-200 focus-within:border-gray-700" onSubmit={handleSubmit}>
            <input value={product} onChange={handleChange}
                className="border-none text-md md:text-xl font-semibold rounded-md  p-1 pl-2 pr-2 outline-none min-w-[100px] font-sans"
                placeholder="Search Product..."
                onFocus={(e) => {
                    e.target.select()
                    setDropDownClicked(true);
                }}
            />
            <RiArrowDropDownLine className={`text-4xl transition-all ${dropDownClicked ? 'rotate-180' : ''} hover:bg-gray-300`} onClick={() => setDropDownClicked((prev) => !prev)} />
            {
                dropDownClicked &&
                <motion.div className={`absolute top-[115%] bg-white shadow-2xl min-w-full left-[-10px] z-10
                    max-h-[300px] rounded-lg overflow-auto p-2
                `}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {
                        productList.map((prod, index) => (
                            <div key={index} className={`p-2 pl-6 pr-6 rounded-md hover:bg-gray-300 cursor-pointer`}
                                onClick={() => {
                                    setProduct(prod);
                                    setProductName("");
                                    setDropDownClicked(false);
                                }}
                            >
                                <span className=" whitespace-nowrap">{prod.name}</span>
                            </div>
                        ))
                    }
                </motion.div>
            }
        </form>
    );
};

export default ProductSearch;