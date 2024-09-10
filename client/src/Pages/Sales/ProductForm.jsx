import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSale } from "../../redux/product/product.slice";

const ProductForm = ({ product, index}) => {
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            price: product.price || 0,
            quantity: product.stocks || 0,
        }
    });
    const dispatch = useDispatch();
    const watchPrice = watch('price');
    const watchQuantity = watch('quantity');

    const onSubmit = (data) => {
        console.log('Product Submitted:', { ...data, product: product._id });
        dispatch(createSale({ ...data, product: product._id }));
    };

    useEffect(() => {
        setValue('total', watchPrice * watchQuantity);
    }, [watchPrice, watchQuantity, setValue]);

    return (
        <form key={index} className="grid grid-cols-[50px_150px_auto_auto_auto_100px] gap-4 items-center" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h1 className="text-2xl font-semibold text-gray-700 font-sans max-w-[150px] whitespace-nowrap overflow-ellipsis">{index + 1}.</h1>
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-gray-700 font-sans">{product.name}</h1>
            </div>
            <div className="flex flex-col">
                <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register('price')}
                    defaultValue={product.price}
                />
            </div>
            <div className="flex flex-col">
                <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register('quantity')}
                    defaultValue={product.quantity}
                />
            </div>
            <div className="flex flex-col">
                <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md cursor-not-allowed"
                    readOnly
                    {...register('total')}
                />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="p-[8px] pl-4 pr-4 bg-primary text-white rounded-md w-fit">Update</button>
            </div>
        </form>
    );
};

export default React.memo(ProductForm);
