import React, { useState } from 'react';
import Card from '../../componenets/Card';
import ProductModalForm from "../../componenets/ProductModalForm";
// import { AnimatePresence } from 'framer-motion';
import { GoTrash } from "react-icons/go";
import { deleteProduct } from '../../redux/product/product.slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../redux/user/selectors';
import ProductDescription from '../../componenets/ProductDescription';
import Modal from '../../componenets/Modal';

const ProductCard = ({ product, type }) => {
    const [clicked, setClicked] = useState(false);
    const { _id, name, price, image, stocks } = product;
    const token = useSelector(selectToken);
    const dispatch = useDispatch();

    return (
        <>
            <Card
                intent={'fitContent'}
                className={`${!clicked ? 'hover:outline hover:outline-2 hover:outline-primary  hover:shadow-lg' : ''} relative flex-row xs:flex-col w-full`}
                onClick={() => setClicked(true)}
                initial={{ y: 20, opacity: 0 }}
                whileHover={!clicked ? { scale: 1.05 } : {}}
                whileTap={!clicked ? { scale: 0.95 } : {}}
                whileInView={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
            >
                <img src={'http://localhost:3000' + image} alt={name} className="w-[100px] xs:w-full aspect-square object-cover rounded-t-xl" />
                <div className='flex-1'>
                    <div className="pt-2 w-full flex justify-between items-center">
                        <div>
                            <h1 className="text-md capitalize md:text-lg font-semibold text-gray-800 whitespace-nowrap">{name}</h1>
                            <p className="text-gray-600 text-xl md:text-2xl">₹{price}<span className=' text-xs md:text-sm text-gray-500 ml-[1px]'>per kg</span></p>
                        </div>
                        {
                            type === 'farmer' &&
                            <div className="p-2 rounded-full shadow-[0px_0px_3px_2px_rgba(0,0,0,0.2)] hover:bg-red-500 text-red-500 hover:text-white transition-colors duration-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(deleteProduct({
                                        _id,
                                        token
                                    }));
                                }}
                            >
                                <GoTrash className='text-lg md:text-2xl font-semibold' />
                            </div>
                        }
                        {/* <div className="absolute bg-primary top-0 right-6 p-2 min-h-[50px] rounded-b-2xl">{remainingStock}</div> */}
                    </div>
                    <p className='text-gray-700 text-sm md:text-md'>Stocks: {stocks} kg</p>
                </div>
                {type === 'consumer' && <p className=''>Seller: <span>{product.farmer.name}</span></p>}
            </Card>

            {
                clicked && (
                    type === 'farmer' ? (
                        <ProductModalForm
                            key="modal"
                            product={product}
                            close={() => setClicked(false)}
                            type={'update'}
                        />
                    ) : type === 'consumer' ? (
                        <Modal
                            // product={product}
                            onClick={() => setClicked(false)}
                        >
                            <ProductDescription product={product} />
                        </Modal>
                    ) : null
                )
            }
        </>
    );
};

export default React.memo(ProductCard);
