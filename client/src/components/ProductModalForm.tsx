import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { useState } from "react";
import CustomButton from "./CustomButton";
import Modal from "./Modal";
import "./styles.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import { addProduct } from "../redux/product/product.slice.ts";
import { selectToken } from "../redux/user/selectors";
import { updateProduct } from "../redux/product/product.slice";
import axios from "axios";
import { FaDotCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Product } from "../types/redux";
import { AppDispatch } from "../redux/store";
import { units } from "@/constant";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

const ProductModalForm = ({
    product,
    close,
    type,
}: {
    product: Product;
    close: (open: boolean) => void;
    type: "create" | "update";
}) => {
    const [priceUnit, setPriceUnit] = useState(product.priceUnit || "kg");
    const [stocksUnit, setStocksUnit] = useState(product.stocksUnit || "kg");
    const [imageChanged, setImageChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMatched, setIsMatched] = useState(true);
    const [prediction, setPrediction] = useState("");
    const token: string = useSelector(selectToken);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { _id, name, price, image, stocks } = product;
    const [previewUrl, setPreviewUrl] = useState(image ? `${image}` : null); // Set initial preview if `image` is provided
    const { register, handleSubmit, formState, reset, setValue, watch } =
        useForm({
            defaultValues: {
                name: name,
                price: price,
                stocks: stocks,
                image: null as FileList | null,
            },
        });

    const watchName = watch("name");
    const { errors } = formState;
    const dispatch = useDispatch<AppDispatch>();
    const onSubmit = async (data: {
        name: string;
        price: number;
        stocks: number;
    }) => {
        // Attach the selected image to the form data
        const formData = new FormData();
        setIsLoading(true);

        // Add the serializable fields to FormData
        formData.append("name", data.name);
        formData.append("price", data.price.toString());
        formData.append("stocks", data.stocks.toString());
        formData.append("priceUnit", priceUnit);
        formData.append("stocksUnit", stocksUnit);

        // Append the file if selected
        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        try {
            let result = name.toLowerCase();
            if (imageChanged) {
                const promise = axios.post(
                    "http://127.0.0.1:10000/api/classify",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                const res = await toast.promise(promise, {
                    pending: {
                        render: "Classifying image...",
                        position: "bottom-right",
                    },
                    success: {
                        render: "Image classified successfully",
                        position: "bottom-right",
                    },
                    error: {
                        render: "Failed to classify image",
                        position: "bottom-right",
                    },
                });
                // result = res.data.result.split("$")[1];
                console.log(res.data);
                // console.log(
                //     result.trim().toLowerCase(),
                //     watchName.trim().toLowerCase()
                // );
                result = res.data.name;
                setPrediction(res.data.name.trim().toLowerCase());
            } else {
                setPrediction(watchName.toLowerCase());
            }
            if (
                watchName.trim().toLowerCase() === result.trim().toLowerCase()
            ) {
                if (type === "create") {
                    const promise = dispatch(
                        addProduct({
                            formData,
                            token,
                        })
                    ).unwrap();
                    toast.promise(promise, {
                        pending: {
                            render: "Adding product to your inventory",
                            position: "bottom-right",
                        },
                        success: {
                            render: "Product added successfully",
                            position: "bottom-right",
                        },
                        error: {
                            render: "Failed to add product",
                            position: "bottom-right",
                        },
                    })
                } else {
                    formData.append("_id", _id);
                    // Update the product
                    const promise = dispatch(
                        updateProduct({
                            formData,
                            token,
                        })
                    ).unwrap();
                    toast.promise(promise, {
                        pending: "Updating product...",
                        success: "Product updated successfully",
                        error: "Failed to update product",
                    });
                }
                setIsLoading(false);
                reset(); // Reset the form
                close(false); // Close the modal
            } else {
                setIsLoading(false);
                setIsMatched(false);
                console.log("not matched");
            }
        } catch (err) {
            setPrediction("failed");
            setIsLoading(false);
            setIsMatched(false);
            console.error(err);
        }
    };

    // Function to handle file input change and set preview
    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setImageChanged(true);
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            setSelectedImage(file); // Get the selected file
            // Create a FileReader to read the file for preview
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string); // Set the preview URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    return (
        // <Modal onClick={close}>
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex md:flex-row flex-col gap-4 text-center justify-between"
            >
                <div className="flex flex-col md:gap-6 items-center">
                    <label
                        htmlFor="image"
                        className="flex items-center justify-center gap-2"
                    >
                        {/* Image preview */}
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="Selected"
                                className=" aspect-square max-w-[200px] md:max-w-[290px] object-cover rounded-xl"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center aspect-square w-[290px] rounded-3xl border-4 border-dashed border-gray-400">
                                <img
                                    src="/imgIcon.svg"
                                    alt=""
                                    className="w-[170px]"
                                />
                                <p className="text-gray-400 text-lg">
                                    Click Here
                                </p>
                            </div>
                        )}
                    </label>
                    <i className="text-sm text-red-500">
                        {errors.image?.message}
                    </i>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                        {...register("image", {
                            required: previewUrl ? false : "Image is required*",
                            validate: {
                                checkFileType: (value: FileList | null) => {
                                    if (value && value[0]) {
                                        const file = value[0];
                                        // Validate the file type
                                        return (
                                            [
                                                "image/jpeg",
                                                "image/png",
                                                "image/svg",
                                                "image/jpg",
                                            ].includes(file.type) ||
                                            "Only JPEG or PNG files are allowed*"
                                        );
                                    }
                                    return true; // If no file is selected, return true to avoid type validation
                                },
                                checkFileSize: (value: FileList | null) => {
                                    if (value && value[0]) {
                                        const file = value[0];
                                        // Validate the file size
                                        return (
                                            file.size < 2000000 ||
                                            "File size must be less than 2MB*"
                                        ); // Limit to 2MB
                                    }
                                    return true; // If no file is selected, return true to avoid size validation
                                },
                            },
                        })}
                        onChange={(event) => {
                            handleFileChange(event); // Call file change handler
                            setValue("image", event.target.files); // Update file value in the form
                        }}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    {/* Name input */}
                    <div className="w-full flex flex-col items-start gap-1">
                        <div className="flex justify-between items-center w-full">
                            <Label htmlFor="name">Name</Label>
                            <i className="text-sm text-red-500">
                                {errors.name?.message}
                            </i>
                        </div>
                        <Input
                            disabled={!imageChanged}
                            className={`peer  ${
                                errors.name ? "focus-visible:ring-red-400" : ""
                            }`}
                            type="text"
                            placeholder="Product Name"
                            {...register("name", {
                                required: "Name is required*",
                            })}
                        />
                    </div>

                    {/* Price input */}
                    <div className="w-full flex flex-col items-start gap-1">
                        <div className="w-full flex justify-between">
                            <Label htmlFor="price">Price(₹)</Label>
                            <i className="text-sm text-red-500">
                                {errors.price?.message}
                            </i>
                        </div>
                        <div className="flex gap-2 w-full">
                            <Input
                                className={`peer  max-w-[190px] ${
                                    errors.price
                                        ? "focus-visible:ring-red-400"
                                        : ""
                                }`}
                                type="number"
                                placeholder="price"
                                {...register("price", {
                                    required: "Price is required*",
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

                    {/* Stocks input */}
                    <div className="w-full flex flex-col items-start gap-1">
                        <div className="w-full flex justify-between">
                            <Label htmlFor="stocks">Stocks</Label>
                            <i className="text-sm text-red-500">
                                {errors.stocks?.message}
                            </i>
                        </div>
                        <div className="flex gap-2 w-full">
                            <Input
                                className={`peer max-w-[190px]  ${
                                    errors.stocks
                                        ? "focus-visible:ring-red-400"
                                        : ""
                                }`}
                                type="number"
                                placeholder="Stock quantity"
                                {...register("stocks", {
                                    required: "Stocks are required*",
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
                                                {unit.value}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* Submit button */}
                    <Button
                        disabled={isLoading}
                        type="submit"
                        variant="default"
                    >
                        {isLoading ? (
                            <>
                                <img
                                    src="/spinLoader.svg"
                                    alt=""
                                    className="w-8"
                                />
                                <span>Please Wait...</span>
                            </>
                        ) : (
                            <span>Done</span>
                        )}
                    </Button>
                </div>
            </form>
            {!isMatched && (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full p-2 bg-red-300 absolute top-[105%] left-0 rounded-xl border-[3px] border-red-600 border-dashed"
                >
                    {prediction === "failed" ? (
                        <>
                            <p className="text-red-600 flex gap-2">
                                <FaDotCircle className="text-xs text-red-600 mt-2" />
                                {`Failed to classify the image`}
                            </p>
                            <p className="text-red-600 flex gap-2">
                                <FaDotCircle className="text-xs text-red-600 mt-2" />
                                Confirm the image is not blurred and does not
                            </p>
                            <p className="text-red-600 flex gap-2">
                                <FaDotCircle className="text-xs text-red-600 mt-2" />
                                contain any other elements except the product
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-red-600 flex gap-2">
                                <FaDotCircle className="text-xs text-red-600 mt-2" />{" "}
                                {`The image does not look like a`}{" "}
                                <span className=" font-semibold">
                                    {watchName.toLowerCase()}
                                </span>
                            </p>
                            <p className="text-red-600 flex gap-2">
                                <FaDotCircle className="text-xs text-red-600 mt-2" />
                                {`The products look a lot like a`}
                                <span className=" font-semibold">
                                    {prediction}
                                </span>
                            </p>
                            <p className="text-red-600 flex gap-2">
                                <FaDotCircle className="text-xs text-red-600 mt-2" />
                                Confirm the image is not blurred and does not
                                contain any other elements except the product
                            </p>
                        </>
                    )}
                </motion.div>
            )}
        </>
        // </Modal>
    );
};

export default React.memo(ProductModalForm);
