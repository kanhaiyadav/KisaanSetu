import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createSale } from "../../redux/sales/sales.slice";

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
        <form key={index} className="flex gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-1/2">
                <label htmlFor="product" className="text-lg font-semibold">Product</label>
                <input
                    type="text"
                    name="product"
                    value={product.name}
                    className="p-2 border border-gray-300 rounded-md cursor-not-allowed"
                    readOnly
                />
            </div>
            <div className="flex flex-col w-1/2">
                <label htmlFor="price" className="text-lg font-semibold">Price Per Unit</label>
                <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register('price')}
                    defaultValue={product.price}
                />
            </div>
            <div className="flex flex-col w-1/2">
                <label htmlFor="quantity" className="text-lg font-semibold">Quantity</label>
                <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md"
                    {...register('quantity')}
                    defaultValue={product.quantity}
                />
            </div>
            <div className="flex flex-col w-1/2">
                <label htmlFor="total" className="text-lg font-semibold">Total</label>
                <input
                    type="number"
                    className="p-2 border border-gray-300 rounded-md cursor-not-allowed"
                    readOnly
                    {...register('total')}
                />
            </div>
            <div className="flex justify-center">
                <button type="submit" className="p-2 mt-4 bg-primary text-white rounded-md w-fit">Update</button>
            </div>
        </form>
    );
};

export default ProductForm;
