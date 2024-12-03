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

const ProductForm = ({ index, close }) => {
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
                dispatch(addSale({ ...data, product: product }));
                setLoading(false);
            })
        reset();
        setProduct({});
        close();
    };

    useEffect(() => {
        if (!isNaN(product.price))
            setValue('price', product.price);
        if (!isNaN(watchPrice) && !isNaN(watchQuantity))
            setValue('total', watchPrice * watchQuantity);
    }, [product, watchPrice, watchQuantity, setValue]);

    return (
        <div className="flex gap-4 md:flex-row flex-col xl:gap-6 justify-star rounded-xl w-fit">
            <div className="max-w-[200px] max-h-[250px] xl:max-w-[300px] xl:max-h-[300px] flex flex-col gap-4">
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
            <form key={index} className="items-center h-fit flex flex-col gap-2 md:gap-4 w-fit"
                onSubmit={handleSubmit(onSubmit)}
            >
                {
                    product?.name &&
                    <div className="flex sm:flex-row flex-col gap-2 sm:gap-8 w-full md:px-[20px] justify-start sm:items-center">
                        <h1 className="text-lg whitespace-nowrap sm:text-xl lg:text-3xl font-bold text-gray-700 capitalize">{product.name}</h1>
                        <div className="flex gap-4">
                            <div className="flex md:gap-2">
                                <span className=" text-md sm:text-lg lg:text-2xl text-gray-600">Stocks:</span>
                                <span className=" text-md sm:text-lg lg:text-2xl text-gray-700 font-semibold">{product.stocks}</span>
                            </div>
                            <div className="flex md:gap-2">
                                <span className="text-md sm:text-lg lg:text-2xl text-gray-600">Price:</span>
                                <span className="text-md sm:text-lg lg:text-2xl text-gray-700 font-semibold">{product.price}</span>
                            </div>
                        </div>
                    </div>
                }

                <div className="grid grid-cols-2 gap-x-4 xl:gap-x-8 gap-y-2 xl:gap-y-2 h-fit w-fit md:px-[20px]">

                    <div className="flex flex-col gap-0">
                        <label className="text-sm md:text-lg text-gray-600 w-[80px]" htmlFor="price">Price:</label>
                        <input
                            id="price"
                            type="number"
                            className="w-[100px] sm:w-[200px] xl:w-[300px] text-md md:text-xl p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register('price')}
                        />
                    </div>
                    <div className="flex flex-col gap-0">
                        <label className="text-sm md:text-lg text-gray-600 w-[80px]" htmlFor="Quantity">Quantity:</label>
                        <input
                            id="quantity"
                            type="number"
                            className="w-[100px] sm:w-[200px] xl:w-[300px] text-md md:text-xl p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register('quantity')}
                        />
                    </div>
                    <div className="flex flex-col gap-0">
                        <label className="text-sm md:text-lg text-gray-600 w-[80px]" htmlFor="total">Total:</label>
                        <input
                            id="total"
                            type="number"
                            disabled
                            className=" cursor-not-allowed w-[100px] sm:w-[200px] xl:w-[300px] text-md md:text-xl p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register('total')}
                        />
                    </div>
                    <div className="flex flex-col gap-0">
                        <label className="text-sm md:text-lg text-gray-600 w-[80px]" htmlFor="date">Date:</label>
                        <input
                            id="date"
                            type="date"
                            className="w-[100px] sm:w-[200px] xl:w-[300px] text-md md:text-xl p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register('date')}
                        />
                    </div>
                    <div className="flex flex-col gap-0">
                        <label className="text-sm md:text-lg text-gray-600 w-[80px]" htmlFor="customer">Customer:</label>
                        <input
                            id="customer"
                            type="text"
                            className="w-[100px] sm:w-[200px] xl:w-[300px] text-md md:text-xl p-2 border border-gray-300 rounded-md text-gray-700"
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
