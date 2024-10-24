import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSale } from "../../redux/product/product.slice";
import CustomButton from "../../componenets/CustomButton";
import { motion } from "framer-motion";

const ProductForm = ({ product, index }) => {
    const [loading, setLoading] = React.useState(false);
    const { register, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: {
            price: product.price || 0,
            quantity: 0,
            date: new Date().toISOString().split('T')[0],
            customer: 'unknown'
        }
    });
    const dispatch = useDispatch();
    const watchPrice = watch('price');
    const watchQuantity = watch('quantity');

    const onSubmit = (data) => {
        setLoading(true);
        dispatch(createSale({ ...data, product: product._id })).unwrap()
            .then(() => {
                setLoading(false);
            })
        reset();
    };

    useEffect(() => {
        setValue('total', watchPrice * watchQuantity);
    }, [watchPrice, watchQuantity, setValue]);

    return (
        <form key={index} className="grid grid-cols-[50px_180px_60px_120px_120px_120px_150px_auto_100px] gap-4 items-center" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1 className="text-2xl font-semibold text-gray-700 font-sans max-w-[150px] whitespace-nowrap overflow-ellipsis">{index + 1}.</h1>
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-gray-700 font-sans">{product.name}</h1>
            </div>
            <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-gray-700 font-sans">{product.stocks}</h1>
            </div>
            <div className="flex flex-col">
                <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md text-gray-700"
                    {...register('price')}
                />
            </div>
            <div className="flex flex-col">
                <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md text-gray-700"
                    {...register('quantity')}
                />
            </div>
            <div className="flex flex-col">
                <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md text-gray-700"
                    {...register('total')}
                />
            </div>
            <div className="flex flex-col">
                <input
                    type="date"
                    // value={new Date().toISOString().split('T')[0]}
                    className="p-2 border border-gray-300 rounded-md text-gray-700"
                    {...register('date')}
                />
            </div>
            <div className="flex flex-col">
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md text-gray-700"
                    {...register('customer')}
                />
            </div>
            <div className="flex justify-center">
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
    );
};

export default React.memo(ProductForm);
