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
import { IoCall } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";

const ProductCard = ({ product, type, ...otherProps }) => {
    const [clicked, setClicked] = useState(false);
    const { _id, name, price, image, stocks } = product;
    const token = useSelector(selectToken);
    const dispatch = useDispatch();

    return (
        <>
            <Card
                intent={'fitContent'}
                className={`${!clicked ? 'hover:outline hover:outline-2 max-w-[800px] hover:outline-primary  hover:shadow-lg' : ''} relative flex ${type == 'farmer' ? 'flex-row xs:flex-col' : 'flex-row'} w-full cursor-default ${ stocks<0 ?'grayscale': ''}`}
                onClick={() => {
                    if (type === 'farmer' && stocks > 0)
                        setClicked(true)
                }}
                initial={{ y: 20, opacity: 0 }}
                // whileHover={!clicked ? { scale: 1.05 } : {}}
                whileTap={!clicked ? { scale: 0.95 } : {}}
                whileInView={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                {...otherProps}
            >
                <img src={image} alt={name} className={` ${type === 'farmer' ? 'w-[100px] xs:w-full aspect-square rounded-t-xl' : 'h-[150px] sm:h-[200px] aspect-square md:aspect-video lg:aspect-square xl:aspect-video rounded-xl'} object-cover `} />
                <div className='flex-1'>
                    {
                        type === 'consumer' &&
                        <div>
                            <div className='flex items-center gap-2'>
                                <img src={product.farmer.avatar} alt={product.farmer.name} className='w-8 sm:w-10 h-8 sm:h-10 rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)] p-1' />
                                <h2 className='text-lg sm:text-2xl hover:underline hover:text-primary font-semibold text-gray-600 font-sans'>{product.farmer.name}</h2>
                            </div>
                            <div className='flex gap-2 sm:gap-4 items-center py-1 sm:py-2'>
                                <IoCall className='hover:bg-primary hover:text-white transition-all text-sm sm:text-xl text-primary p-[5px] sm:p-2 box-content rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)]' />
                                <TbMessage className='hover:bg-primary hover:text-white transition-all text-sm sm:text-xl text-primary p-[5px] sm:p-2 box-content rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)]' />
                                <button className='hover:bg-primary hover:text-white transition-all sm:text-md text-sm text-primary p-[5px] sm:p-2 px-4 rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)]'>Reviews</button>
                            </div>
                        </div>
                    }
                    <div className="sm:pt-2 w-full flex justify-between items-center">
                        <div>
                            <h1 className={`text-md capitalize ${type === 'farmer' ? '' : 'hidden'} md:text-lg font-semibold text-gray-800 whitespace-nowrap`}>{name}</h1>
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
                    <p className='text-gray-600 text-xs sm:text-sm md:text-md font-sans'>{stocks}kg Remaining</p>
                    {
                        type !== 'farmer' && <p className='text-gray-600 text-xs sm:text-sm font-sans hover:underline hover:text-primary mt-1'>Rate the product</p>
                    }
                </div>
                <div className='px-2 py-1 rounded-full absolute right-2 bottom-2 flex items-center font-sans text-gray-600 shadow-[1px_1px_2px_1px_rgba(0,0,0,0.1)] text-xs sm:text-md'>4.5{<FaStar className='text-[#FFD700]'/>}</div>
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
