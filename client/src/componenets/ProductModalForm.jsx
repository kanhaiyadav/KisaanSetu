import React, { useState } from "react";
import CustomButton from "./CustomButton";
import Modal from "./Modal";
import "./styles.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/product/product.slice";
import { selectToken } from "../redux/user/selectors";
import { updateProduct } from "../redux/product/product.slice";
import axios from "axios";
import { FaDotCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductModalForm = ({ product, close, type }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isMatched, setIsMatched] = useState(true);
    const [prediction, setPrediction] = useState('');
    const token = useSelector(selectToken);
    const [selectedImage, setSelectedImage] = useState(null);
    const { _id, name, price, image, stocks } = product;
    const [previewUrl, setPreviewUrl] = useState(image ? `http://localhost:3000${image}` : null); // Set initial preview if `image` is provided
    const { register, handleSubmit, formState, reset, setValue, watch } = useForm({
        defaultValues: {
            name: name,
            price: price,
            stocks: stocks,
        },
    });

    const watchName = watch("name");
    const { errors } = formState;
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        // Attach the selected image to the form data
        const formData = new FormData();
        setIsLoading(true);

        // Add the serializable fields to FormData
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("stocks", data.stocks);

        // Append the file if selected
        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        try {
            const res = await axios.post('http://localhost:3000/classify', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const result = res.data.result.split('$')[1];
            console.log(result.trim().toLowerCase(), watchName.trim().toLowerCase());
            setPrediction(result.trim().toLowerCase());
            if (watchName.trim().toLowerCase() === result.trim().toLowerCase()) {
                if (type === 'create') {
                    dispatch(addProduct({
                        formData,
                        token,
                    }));
                } else {
                    formData.append("_id", _id);
                    // Update the product
                    dispatch(updateProduct({
                        formData,
                        token,
                    }));
                }
                reset(); // Reset the form
                close();
            }
            else {
                setIsLoading(false);
                setIsMatched(false);
                console.log('not matched');
            }
        } catch (err) {
            console.error(err);
        }

    };

    // Function to handle file input change and set preview
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);// Get the selected file
            // Create a FileReader to read the file for preview
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result); // Set the preview URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    return (
        <Modal onClick={close}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 text-center">
                <div className="flex flex-col gap-6 items-center">
                    <label htmlFor="image" className="flex items-center justify-center gap-2">
                        {/* Image preview */}
                        {previewUrl ?
                            <img src={previewUrl} alt="Selected" className=" aspect-square max-w-[290px] object-cover rounded-xl" />
                            :
                            <div className="flex flex-col items-center justify-center aspect-square w-[290px] rounded-3xl border-4 border-dashed border-gray-400">
                                <img src="/imgIcon.svg" alt="" className="w-[170px]" />
                                <p className="text-gray-400 text-lg">Click Here</p>
                            </div>
                        }
                    </label>
                    <i className="text-sm text-red-500">{errors.image?.message}</i>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                        {...register("image", {
                            required: previewUrl ? false : "Image is required*",
                            validate: {
                                checkFileType: (value) => {
                                    if (value && value[0]) {
                                        const file = value[0];
                                        // Validate the file type
                                        return ["image/jpeg", "image/png", "image/svg", "image/jpg"].includes(file.type) || "Only JPEG or PNG files are allowed*";
                                    }
                                    return true; // If no file is selected, return true to avoid type validation
                                },
                                checkFileSize: (value) => {
                                    if (value && value[0]) {
                                        const file = value[0];
                                        // Validate the file size
                                        return file.size < 2000000 || "File size must be less than 2MB*"; // Limit to 2MB
                                    }
                                    return true; // If no file is selected, return true to avoid size validation
                                }
                            }
                        })}
                        onChange={(event) => {
                            handleFileChange(event); // Call file change handler
                            setValue("image", event.target.files); // Update file value in the form
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    {/* Name input */}
                    <div className="w-full flex flex-col items-start gap-1">
                        <div className="flex justify-between items-center w-full">
                            <label htmlFor="name">Name</label>
                            <i className="text-sm text-red-500">{errors.name?.message}</i>
                        </div>
                        <input
                            className={`peer PhoneInputInput ${errors.name ? "focus:border-red-500" : "focus:border-[#d39a57]"}`}
                            type="text"
                            placeholder="onion"
                            {...register("name", { required: "Name is required*" })}
                        />
                    </div>

                    {/* Price input */}
                    <div className="w-full flex flex-col items-start gap-1">
                        <div className="w-full flex justify-between">
                            <label htmlFor="price">Price</label>
                            <i className="text-sm text-red-500">{errors.price?.message}</i>
                        </div>
                        <input
                            className={`peer PhoneInputInput ${errors.price ? "focus:border-red-500" : "focus:border-[#d39a57]"}`}
                            type="text"
                            placeholder="500"
                            {...register("price", { required: "Price is required*" })}
                        />
                    </div>

                    {/* Stocks input */}
                    <div className="w-full flex flex-col items-start gap-1">
                        <div className="w-full flex justify-between">
                            <label htmlFor="stocks">Stocks</label>
                            <i className="text-sm text-red-500">{errors.stocks?.message}</i>
                        </div>
                        <input
                            className={`peer PhoneInputInput ${errors.stocks ? "focus:border-red-500" : "focus:border-[#d39a57]"}`}
                            type="text"
                            placeholder="Stock quantity"
                            {...register("stocks", { required: "Stocks are required*" })}
                        />
                    </div>
                    {/* Submit button */}
                    <CustomButton type="submit" style={{ width: '100%', marginTop: '10px' }}>
                        {
                            isLoading ? 
                                <>
                                    <img src="/spinLoader.svg" alt="" className="w-8" />
                                    <span>Please Wait...</span>
                                </>
                                :
                                <span>Done</span>
                    }
                    </CustomButton>
                </div>
            </form>
            {
                !isMatched && (
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full p-2 bg-red-300 absolute top-[105%] left-0 rounded-xl border-[3px] border-red-600 border-dashed">
                        <p className="text-red-600 flex gap-2"><FaDotCircle className="text-xs text-red-600 mt-2" /> {`The image does not look like a`} <span className=" font-semibold">{watchName.toLowerCase()}</span></p>
                        <p className="text-red-600 flex gap-2"><FaDotCircle className="text-xs text-red-600 mt-2" />{`The products look a lot like a`}<span className=" font-semibold">{prediction}</span></p>
                        <p className="text-red-600 flex gap-2"><FaDotCircle className="text-xs text-red-600 mt-2" />Confirm the image is not blurred and does not contain any other elements except the product</p>
                    </motion.div>
                )
            }
        </Modal>
    );
};

export default React.memo(ProductModalForm);