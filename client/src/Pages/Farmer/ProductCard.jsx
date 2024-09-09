import React, { useState } from 'react';
import Card from '../../componenets/Card';
import ProductModalForm from "../../componenets/ProductModalForm";
// import { AnimatePresence } from 'framer-motion';
import { GoTrash } from "react-icons/go";
import { deleteProduct } from '../../redux/product/product.slice';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
    const [clicked, setClicked] = useState(false);
    const { _id, name, price, image, stocks } = product;
    const dispatch = useDispatch();

    return (
        <>
            <Card
                intent={'fitContent'}
                className={`break-inside-avoid border-2 ${!clicked ? 'hover:border-primary hover:shadow-lg' : ''} relative`}
                onClick={() => setClicked(true)}
                initial={{ y: 20, opacity: 0 }}
                whileHover={!clicked ? { scale: 1.05 } : {}}
                whileTap={!clicked ? { scale: 0.95 } : {}}
                whileInView={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
            >
                <img src={'http://localhost:3000' + image} alt={name} className="w-full object-cover rounded-t-xl" />
                <div className="pt-2 w-full flex justify-between items-center">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
                        <p className="text-gray-600 text-2xl">₹{price}<span className='text-sm text-gray-500 ml-2'>per kg</span></p>
                    </div>
                    <div className="p-2 rounded-full shadow-[0px_0px_3px_2px_rgba(0,0,0,0.2)] hover:bg-red-500 text-red-500 hover:text-white transition-colors duration-500"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteProduct(_id));
                        }}
                    >
                        <GoTrash className='text-2xl font-semibold' />
                    </div>
                    {/* <div className="absolute bg-primary top-0 right-6 p-2 min-h-[50px] rounded-b-2xl">{remainingStock}</div> */}
                </div>
                <p className='text-gray-700'>current stock: {stocks} kg</p>
            </Card>

            {clicked && (
                <ProductModalForm
                    key="modal" // Optional: Add a unique key if needed
                    product={product}
                    close={() => setClicked(false)}
                    type={'update'}
                />
            )}
        </>
    );
};

export default React.memo(ProductCard);
