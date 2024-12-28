import React from "react";
import { set, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import { createSale } from "../../redux/product/product.slice";
import CustomButton from "../../components/CustomButton";
import { motion } from "framer-motion";
import ProductSearch from "./SearchBar";
import { selectUserInfo } from "../../redux/user/selectors";
//@ts-ignore
import { addSale } from "../../redux/product/product.slice";
import { Product, Sale } from "../../types/redux";
import { User } from "../../types/redux";
import { AppDispatch } from "../../redux/store.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { BiError } from "react-icons/bi";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { units } from "@/constant";

const ProductForm = ({
    close,
    productItem,
}: {
    close: (open: boolean) => void;
    productItem?: Product;
}) => {
    const [product, setProduct] = React.useState<Product>();
    const [loading, setLoading] = React.useState(false);
    const [priceUnit, setPriceUnit] = React.useState(
        product?.priceUnit || "kg"
    );
    const [stocksUnit, setStocksUnit] = React.useState(
        product?.stocksUnit || "kg"
    );
    const { register, handleSubmit, setValue, watch, reset, formState } =
        useForm({
            defaultValues: {
                productName: undefined,
                price: undefined,
                quantity: undefined,
                total: undefined,
                date: new Date().toISOString().split("T")[0],
                customer: "",
            },
        });

    useEffect(() => {
        if (product) {
            setPriceUnit(product.priceUnit);
            setStocksUnit(product.stocksUnit);
            setValue("productName", product.name);
        }
    }, [product]);

    const { errors } = formState;

    const dispatch = useDispatch<AppDispatch>();

    const watchPrice = watch("price");
    const watchQuantity = watch("quantity");
    const user: User = useSelector(selectUserInfo);
    console.log(user);
    const onSubmit = (data: {
        productName: string | undefined;
        price: number | undefined;
        quantity: number | undefined;
        total: number | undefined;
        date: string;
        customer: string;
    }) => {
        setLoading(true);
        if (product) {
            const promise = dispatch(
                createSale({
                    ...data,
                    product: product._id,
                    priceUnit: priceUnit,
                    stocksUnit: stocksUnit,
                    userId: user._id,
                } as Sale)
            ).unwrap();
            toast.promise(promise, {
                pending: "Creating Sale...",
                success: {
                    render({
                        data,
                    }: {
                        data: {
                            message: string;
                        };
                    }) {
                        setLoading(false);
                        return data.message;
                    },
                    autoClose: 5000,
                    position: "bottom-right",
                },
                error: {
                    render({ data }: { data: { error: string } }) {
                        setLoading(false);
                        return data.error;
                    },
                    autoClose: 5000,
                    position: "bottom-right",
                },
            });
        }
        reset();
        setProduct(undefined);
        close(false);
    };

    useEffect(() => {
        if (product && !isNaN(product.price)) setValue("price", product.price);
    }, [product, setValue]);

    useEffect(() => {
        if (watchPrice !== undefined && watchQuantity !== undefined && !isNaN(watchPrice) && !isNaN(watchQuantity))
            setValue("total", watchPrice * watchQuantity );
    }, [watchPrice, watchQuantity, setValue]);

    return (
        <div className=" flex gap-4 md:flex-row flex-col xl:gap-6 justify-star rounded-xl w-fit">
            <div className="max-w-[200px] xl:max-w-[300px] flex flex-col gap-4">
                <ProductSearch setProduct={setProduct} />
                {product?.image ? (
                    <img
                        src={product?.image}
                        alt=""
                        className="w-full aspect-square object-cover rounded-lg"
                    />
                ) : (
                    <div
                        className={`w-full aspect-square h-20 flex-1 border-4 border-gray-400 border-dashed
                            rounded-2xl flex justify-center items-center
                        `}
                    >
                        <img src="/imgIcon.svg" alt="" className="w-[70%]" />
                    </div>
                )}
            </div>
            <form
                className="items-center h-fit flex flex-col gap-2 md:gap-4 w-fit"
                onSubmit={handleSubmit(onSubmit)}
            >
                {product?.name && (
                    <div className="flex sm:flex-row flex-col gap-2 sm:gap-8 w-full md:px-[20px] justify-start sm:items-center">
                        <h1 className="text-lg whitespace-nowrap sm:text-lg lg:text-xl font-bold text-gray-700 capitalize">
                            {product.name}
                        </h1>
                        <div className="flex gap-4">
                            <div className="flex md:gap-2">
                                <span className="  text-xs sm:text-sm lg:text-[16px] text-gray-800">
                                    Stocks:
                                </span>
                                <span className="  text-xs sm:text-sm lg:text-[16px] text-gray-700 font-semibold">
                                    {product.stocks}
                                    {product.stocksUnit}
                                </span>
                            </div>
                            <div className="flex md:gap-2">
                                <span className=" text-xs sm:text-sm lg:text-[16px] text-gray-800">
                                    Price:
                                </span>
                                <span className=" text-xs sm:text-sm lg:text-[16px] text-gray-700 font-semibold">
                                    {product.price}/{product.priceUnit}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-x-4 xl:gap-x-8 gap-y-4 h-fit w-fit md:px-[20px]">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="productName">Product name:</Label>
                        <Input
                            id="productName"
                            type="text"
                            readOnly
                            className="p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register("productName", {
                                required: "Product name is required",
                            })}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="customer">Customer name:</Label>
                        <Input
                            id="customer"
                            type="text"
                            className="p-2 border border-gray-300 rounded-md text-gray-700"
                            {...register("customer", {
                                required: "Customer name is required",
                            })}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="price">Price(₹):</Label>
                        <div className="flex gap-2 w-full">
                            <Input
                                id="price"
                                type="number"
                                className={`${
                                    errors.price
                                        ? "border-red-400 focus-visible:ring-red-400"
                                        : ""
                                } p-2 border border-gray-300 rounded-md text-gray-700`}
                                {...register("price", {
                                    required: "Price is required",
                                    validate: {
                                        checkValueNonNegative: (
                                            value: number | undefined
                                        ) => {
                                            if (value) {
                                                return (
                                                    value > 0 ||
                                                    "price must be greater than 0"
                                                );
                                            }
                                            return true;
                                        },
                                    },
                                })}
                            />
                            <Select
                                defaultValue="kg"
                                onValueChange={setPriceUnit}
                                value={priceUnit}
                            >
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Units</SelectLabel>
                                        {units.map((unit) => (
                                            <SelectItem
                                                key={unit.id}
                                                value={unit.value}
                                            >
                                                /{unit.value}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="Quantity">Quantity:</Label>
                        <div className="flex gap-2 w-full">
                            <Input
                                id="quantity"
                                type="number"
                                className={`${
                                    errors.quantity
                                        ? "border-red-400 focus-visible:ring-red-400"
                                        : ""
                                } p-2 border border-gray-300 rounded-md text-gray-700`}
                                {...register("quantity", {
                                    required: "Quantity is required",
                                    validate: {
                                        checkLessThanStocks: (
                                            value: number | undefined
                                        ) => {
                                            if (product && value) {
                                                return (
                                                    value <= product.stocks ||
                                                    `Quantity must be less than or equal to ${product.stocks}`
                                                );
                                            }
                                            return true;
                                        },
                                        checkValueNonNegative: (
                                            value: number | undefined
                                        ) => {
                                            if (value) {
                                                return (
                                                    value > 0 ||
                                                    "Quantity must be greater than 0"
                                                );
                                            }
                                            return true;
                                        },
                                    },
                                })}
                            />
                            <Select
                                defaultValue="kg"
                                onValueChange={setStocksUnit}
                                value={stocksUnit}
                            >
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Units</SelectLabel>
                                        {units.map((unit) => (
                                            <SelectItem
                                                key={unit.id}
                                                value={unit.value}
                                            >
                                                /{unit.value}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="total">Total:</Label>
                        <Input
                            id="total"
                            type="number"
                            readOnly
                            className={`${
                                errors.total
                                    ? "border-red-400 focus-visible:ring-red-400"
                                    : ""
                            } cursor-not-allowed p-2 border border-gray-300 rounded-md text-gray-700`}
                            {...register("total")}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="date">Date:</Label>
                        <Input
                            id="date"
                            type="date"
                            className={`${
                                errors.date
                                    ? "border-red-400 focus-visible:ring-red-400"
                                    : ""
                            } p-2 border border-gray-300 rounded-md text-gray-700`}
                            {...register("date")}
                        />
                    </div>
                    {(errors.price ||
                        errors.quantity ||
                        errors.total ||
                        errors.date ||
                        errors.customer ||
                        errors.productName) && (
                        <div className=" col-span-2 rounded-lg bg-red-50 p-4 border border-dashed border-red-500 border-border">
                            {errors.productName && (
                                <div className="flex items-center gap-2">
                                    <BiError className="text-red-500" />
                                    <span className="text-red-500 text-sm">
                                        {errors.productName.message}
                                    </span>
                                </div>
                            )}
                            {errors.customer && (
                                <div className="flex items-center gap-2">
                                    <BiError className="text-red-500" />
                                    <span className="text-red-500 text-sm">
                                        {errors.customer.message}
                                    </span>
                                </div>
                            )}
                            {errors.price && (
                                <div className="flex items-center gap-2">
                                    <BiError className="text-red-500" />
                                    <span className="text-red-500 text-sm">
                                        {errors.price.message}
                                    </span>
                                </div>
                            )}
                            {errors.quantity && (
                                <div className="flex items-center gap-2">
                                    <BiError className="text-red-500" />
                                    <span className="text-red-500 text-sm">
                                        {errors.quantity.message}
                                    </span>
                                </div>
                            )}
                            {errors.total && (
                                <div className="flex items-center gap-2">
                                    <BiError className="text-red-500" />
                                    <span className="text-red-500 text-sm">
                                        {errors.total.message}
                                    </span>
                                </div>
                            )}
                            {errors.date && (
                                <div className="flex items-center gap-2">
                                    <BiError className="text-red-500" />
                                    <span className="text-red-500 text-sm">
                                        {errors.date.message}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex gap-8 justify-center">
                    <Button
                        type="button"
                        disabled={loading}
                        onClick={() => {
                            reset();
                            setProduct(undefined);
                            close(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading && (
                            <div className="absolute w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
                                <motion.img
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    src="/spinLoader.svg"
                                    alt=""
                                    className=" w-10 h-10"
                                />
                            </div>
                        )}
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default React.memo(ProductForm);
