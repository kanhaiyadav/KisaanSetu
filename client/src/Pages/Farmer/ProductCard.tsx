import React, { useState } from "react";
import Card from "../../components/Card";
import ProductModalForm from "../../components/ProductModalForm";
import { GoTrash } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { deleteProduct, outOfStock } from "../../redux/product/product.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/user/selectors";
// import ProductDescription from "../../components/ProductDescription";
import { IoCall } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import { Product } from "../../types/redux";
import { AppDispatch } from "../../redux/store";

import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import { TbBoxOff } from "react-icons/tb";
import { localOutofStock } from "../../redux/product/product.slice";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { CgOptions } from "react-icons/cg";

const ProductCard = ({
    product,
    type,
    ...otherProps
}: {
    product: Product;
    type: "farmer" | "consumer";
    otherProps?: any;
    id?: string;
}) => {
    const [open, setOpen] = useState(false);
    const { _id, name, price, image, stocks, stocksUnit, priceUnit } = product;
    const token = useSelector(selectToken);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            <Card
                intent={"fitContent"}
                className={`${"hover:outline hover:outline-2 max-w-[800px] hover:outline-primary  hover:shadow-lg"} relative flex ${
                    type == "farmer" ? "flex-row xs:flex-col" : "flex-row"
                } w-full cursor-default ${stocks <= 0 ? "grayscale" : ""}`}
                // onClick={() => {
                //     if (type === 'farmer' && stocks > 0)
                //         setClicked(true)
                // }}
                initial={{ y: 20, opacity: 0 }}
                // whileHover={!clicked ? { scale: 1.05 } : {}}
                // whileTap={!clicked ? { scale: 0.95 } : {}}
                whileInView={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                {...otherProps}
            >
                <img
                    src={image}
                    alt={name}
                    className={` ${
                        type === "farmer"
                            ? "w-[100px] xs:w-full aspect-square rounded-t-xl"
                            : "h-[150px] sm:h-[200px] aspect-square md:aspect-video lg:aspect-square xl:aspect-video rounded-xl"
                    } object-cover `}
                />
                <div className="flex-1">
                    {type === "consumer" && (
                        <div>
                            <div className="flex items-center gap-2">
                                <img
                                    src={product.farmer.avatar}
                                    alt={product.farmer.name}
                                    className="w-8 sm:w-10 h-8 sm:h-10 rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)] p-1"
                                />
                                <h2 className="text-lg sm:text-2xl hover:underline hover:text-primary font-semibold text-gray-600 font-sans">
                                    {product.farmer.name}
                                </h2>
                            </div>
                            <div className="flex gap-2 sm:gap-4 items-center py-1 sm:py-2">
                                <IoCall className="hover:bg-primary hover:text-white transition-all text-sm sm:text-xl text-primary p-[5px] sm:p-2 box-content rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)]" />
                                <TbMessage className="hover:bg-primary hover:text-white transition-all text-sm sm:text-xl text-primary p-[5px] sm:p-2 box-content rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)]" />
                                <button className="hover:bg-primary hover:text-white transition-all sm:text-md text-sm text-primary p-[5px] sm:p-2 px-4 rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)]">
                                    Reviews
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="sm:pt-2 w-full flex justify-between items-center">
                        <div>
                            <h1
                                className={`text-lg capitalize ${
                                    type === "farmer" ? "" : "hidden"
                                } md:text-xl font-sans font-semibold text-gray-800 whitespace-nowrap`}
                            >
                                {name}
                            </h1>
                            <p className="text-gray-600 text-xl md:text-2xl">
                                ₹{price}
                                <span className=" text-xs md:text-sm text-gray-500 ml-[1px]">
                                    per {priceUnit}
                                </span>
                            </p>
                        </div>
                        {/* <div className="absolute bg-primary top-0 right-6 p-2 min-h-[50px] rounded-b-2xl">{remainingStock}</div> */}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="text-2xl"
                                    >
                                        <CgOptions className="h-6 w-6" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent sideOffset={5}>
                                    <DropdownMenuLabel>
                                        Options
                                    </DropdownMenuLabel>
                                    <DialogTrigger
                                        onClick={() => setOpen(true)}
                                        asChild
                                    >
                                        <DropdownMenuItem>
                                            <FiEdit />
                                            Edit
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    <DropdownMenuItem
                                        disabled={stocks <= 0}
                                        onClick={(e) => {
                                            dispatch(localOutofStock(_id));
                                            dispatch(outOfStock(_id));
                                        }}
                                    >
                                        <TbBoxOff />
                                        Out of Stock
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(
                                                deleteProduct({
                                                    _id,
                                                    token,
                                                })
                                            );
                                        }}
                                        className="focus:bg-red-100 text-red-600 focus:text-red-600"
                                    >
                                        <GoTrash />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <DialogContent className="max-w-[350px] md:max-w-xl">
                                <DialogHeader>
                                    <DialogTitle>Product updation form</DialogTitle>
                                    <DialogDescription>
                                        You can change any of the following information.
                                    </DialogDescription>
                                </DialogHeader>
                                <ProductModalForm
                                    key="modal" // Optional: Add a unique key if needed
                                    product={product}
                                    type="update"
                                    close={setOpen}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-md font-sans">
                        {stocks}
                        {stocksUnit} Remaining
                    </p>
                    {type !== "farmer" && (
                        <p className="text-gray-600 text-xs sm:text-sm font-sans hover:underline hover:text-primary mt-1">
                            Rate the product
                        </p>
                    )}
                </div>
                <div className="px-2 py-1 rounded-full absolute right-2 bottom-2 flex items-center font-sans text-gray-600 shadow-[1px_1px_2px_1px_rgba(0,0,0,0.1)] text-xs sm:text-md">
                    4.5{<FaStar className="text-[#FFD700]" />}
                </div>
            </Card>
        </>
    );
};

export default React.memo(ProductCard);
