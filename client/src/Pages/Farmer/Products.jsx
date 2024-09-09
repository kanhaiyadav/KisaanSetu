import { useState } from 'react';
import ProductModalForm from "../../componenets/ProductModalForm";
import ProductCard from "./ProductCard"
// import { products } from "./data"
import Header from "../../componenets/DashboardHeader"
import { IoMdAdd } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import { useSelector, useDispatch,  } from 'react-redux';
import { selectProducts } from '../../redux/product/product.selector';

const Products = () => {
    const [clicked, setClicked] = useState(false);
    const products = useSelector(selectProducts);
    return (
        <>
            <div className={`flex-1 flex flex-col `}>
                <Header title={'Products'} />
                <main className={`flex-1 columns-1 sm:columns-2 md:columns-3 lg:columns-4 overflow-auto p-4 gap-4 space-y-6`}>
                    {
                        products.length > 0?
                        products.map((product, index) => <ProductCard key={index} product={product} />)
                        : <div className="text-center text-lg">No products available</div>
                    }
                </main>
                <div className={`h-[60px] w-[60px] absolute right-[42px] bottom-[42px] rounded-full bg-primary animate-ping`} />
                <div className={`h-[80px] w-[80px] absolute right-8 bottom-8 text-6xl flex 
            items-center justify-center rounded-full bg-primary text-white
            `}
                    onClick={() => setClicked(true)}
                >
                    <IoMdAdd />
                </div>
            </div>
            <AnimatePresence>
                {clicked && (
                    <ProductModalForm
                        key="modal" // Optional: Add a unique key if needed
                        product={{ name: '', price: '', image: '', stocks: '' }}
                        close={() => setClicked(false)}
                        type={'create'}
                    />
                )}
            </AnimatePresence>
        </>
    )
}

export default Products