import { useState } from "react";
import ProductModalForm from "../../components/ProductModalForm";
import ProductCard from "./ProductCard";
// import { products } from "./data"
import Header from "../../components/DashboardHeader";
// import { IoMdAdd } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/product/product.selector";
import OptionHeader from "../../components/OptionHeader";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Products = () => {
    const [sortItem, setSortItem] = useState("name");
    const [acending, setAcending] = useState(true);
    let products = useSelector(selectProducts);
    if (sortItem === "price")
        acending
            ? (products = products.slice().sort((a, b) => a.price - b.price))
            : (products = products.slice().sort((a, b) => b.price - a.price));
    else if (sortItem === "name")
        acending
            ? (products = products
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name)))
            : (products = products
                .slice()
                .sort((a, b) => b.name.localeCompare(a.name)));
    else
        acending
            ? (products = products.slice().sort((a, b) => a.stocks - b.stocks))
            : (products = products.slice().sort((a, b) => b.stocks - a.stocks));
    return (
        <div className="flex flex-col h-full">
            {/* <div className='w-full bg-orange-400 h-[60px]'></div> */}
            <OptionHeader
                acending={acending}
                setAcending={setAcending}
                currSortItem={sortItem}
                setSortItem={setSortItem}
                sortItems={["name", "price", "stock"]}
                scrollDivID={"productList"}
            />
            <main
                id="productList"
                className={`flex-1 shadow-[inset_0_0_2px_2px_rgba(0,0,0,0.1)] bg-gray-200 ${products.length > 0
                    ? "grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                    : "flex items-center justify-center"
                    } overflow-auto p-4 gap-2 xs:gap-4`}
            >
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductCard
                            key={index}
                            product={product}
                            type={"farmer"}
                            id={product.name.toLowerCase()}
                        />
                    ))
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center mt-[-200px] relative">
                        <DotLottieReact
                            src={"/lottie/no-results.lottie"}
                            autoplay
                            style={{ width: "400px", height: "400px" }}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <p className="text-[#a2a2a2] text-md  mt-[-50px]">
                                You have not added any products yet
                            </p>
                            <p className="text-[#a2a2a2] text-lg font-semibold ">
                                Click on the &apos;+&apos; button to add a new
                                product
                            </p>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Products;
