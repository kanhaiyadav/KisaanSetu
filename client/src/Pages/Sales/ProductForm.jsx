import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSale } from "../../redux/product/product.slice";
import CustomButton from "../../componenets/CustomButton";
import { motion } from "framer-motion";
import ProductSearch from "./SearchBar";
import { selectUserInfo } from "../../redux/user/selectors";
import { addSale } from "../../redux/product/product.slice";

const ProductForm = ({ index }) => {
    const [product, setProduct] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const { register, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: {
            price: 0,
            quantity: 0,
            total: 0,
            date: new Date().toISOString().split('T')[0],
            customer: 'unknown'
        }
    });
    const dispatch = useDispatch();
    const watchPrice = watch('price');
    const watchQuantity = watch('quantity');
    const user = useSelector(selectUserInfo);
    console.log(user);
    const onSubmit = (data) => {
        setLoading(true);
        dispatch(createSale({ ...data, product: product._id, userId: user._id })).unwrap()
            .then(() => {
                dispatch(addSale({...data, product: product}));
                setLoading(false);
            })
        reset();
        setProduct({});
    };

    useEffect(() => {
        if(!isNaN(product.price))
            setValue('price', product.price);
        if(!isNaN(watchPrice) && !isNaN(watchQuantity))
            setValue('total', watchPrice * watchQuantity);
    }, [product, watchPrice, watchQuantity, setValue]);

    return (
        <div className="flex gap-6 pl-[20px] mt-[10px] justify-start bg-gray-100 p-4 rounded-xl shadow-sm w-fit">
            <div className="max-w-[300px] flex flex-col gap-4">
                <ProductSearch setProduct={setProduct} />
                {
                    product?.image ?
                        <img src={`http://localhost:3000${product?.image}`} alt="" className="w-full aspect-square object-cover rounded-lg" />
                        :
                        <div
                            className={`w-full aspect-square h-20 flex-1 border-4 border-gray-400 border-dashed
                            rounded-2xl flex justify-center items-center
                        `}
                        >
                            <img src="/imgIcon.svg" alt="" className="w-[70%]" />
                        </div>
                }
            </div>
            <form key={index} className="items-center h-fit flex flex-col gap-4 w-fit"
                onSubmit={handleSubmit(onSubmit)}
            >
                {
                    product?.name &&
                    <div className="flex gap-8 w-full px-[20px] justify-start">
                            <h1 className="text-3xl font-bold text-gray-700 capitalize">{product.name}</h1>
                        <div className="flex gap-2">
                            <span className="text-2xl text-gray-600">Stocks:</span>
                            <span className="text-2xl text-gray-700 font-semibold">{product.stocks}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-2xl text-gray-600">Price:</span>
                            <span className="text-2xl text-gray-700 font-semibold">{product.price}</span>
                        </div>
                    </div>
                }
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 h-fit w-fit px-[20px]">

                    <div className="flex items-center gap-4">
                        <label className="text-lg text-gray-600 w-[80px]" htmlFor="price">Price:</label>
                        <input
                            id="price"
                            type="number"
                            className="text-xl p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register('price')}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="text-lg text-gray-600 w-[80px]" htmlFor="Quantity">Quantity:</label>
                        <input
                            id="quantity"
                            type="number"
                            className="text-xl p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register('quantity')}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="text-lg text-gray-600 w-[80px]" htmlFor="total">Total:</label>
                        <input
                            id="total"
                            type="number"
                            disabled
                            className=" cursor-not-allowed text-xl p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register('total')}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="text-lg text-gray-600 w-[80px]" htmlFor="date">Date:</label>
                        <input
                            id="date"
                            type="date"
                            className="text-xl p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register('date')}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="text-lg text-gray-600 w-[80px]" htmlFor="customer">Customer:</label>
                        <input
                            id="customer"
                            type="text"
                            className="text-xl p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register('customer')}
                        />
                    </div>
                </div>
                <div className="flex gap-8 justify-center">
                    <CustomButton type="button" disabled={loading} intent={'primary'}
                        onClick={() => {
                            reset();
                            setProduct({});
                        }}
                    >
                        <span>Cancel</span>
                    </CustomButton>
                    <CustomButton type="submit" disabled={loading} intent={'primary'} >
                        {
                            loading && (
                                <div className="absolute w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
                                    <motion.img
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        src="/spinLoader.svg" alt="" className=" w-10 h-10" />
                                </div>
                            )
                        }
                        <span>Update</span>
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

export default React.memo(ProductForm);
