import React, { useState } from "react";
import CustomButton from "./CustomButton";
import Modal from "./Modal";
import "./styles.css";
import { FaUpload } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/product/product.slice";
import { selectToken } from "../redux/user/selectors";
import { updateProduct } from "../redux/product/product.slice";

const ProductModalForm = ({ product, close, type }) => {
    const token = useSelector(selectToken);
    const [selectedImage, setSelectedImage] = useState(null);
    const {_id, name, price, image, stocks } = product;
    const [previewUrl, setPreviewUrl] = useState(image?`http://localhost:3000${image}`: null); // Set initial preview if `image` is provided
    const { register, handleSubmit, formState, reset, setValue } = useForm({
        defaultValues: {
            name: name,
            price: price,
            stocks: stocks,
        },
    });
    const { errors } = formState;

    const dispatch = useDispatch();

    const onSubmit = (data) => {
        // Attach the selected image to the form data
        const formData = new FormData();

        // Add the serializable fields to FormData
        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("stocks", data.stocks);

        // Append the file if selected
        if (selectedImage) {
            formData.append("image", selectedImage);
        }

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
            <div className="flex flex-col gap-4">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[350px] text-center">
                    <div className="flex gap-6 items-center">
                        {/* Image preview */}
                        {previewUrl && (
                            <img src={previewUrl} alt="Selected" className="h-[70px] object-cover rounded-md" />
                        )}
                        <div className="flex flex-col text-left">
                            <CustomButton>
                                <label htmlFor="image" className="flex items-center justify-center gap-2">
                                    {previewUrl ? "Change Image" : "Upload Image"} <FaUpload />
                                </label>
                            </CustomButton>
                            <i className="text-sm text-red-500">{errors.image?.message}</i>

                        </div>
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
                    <CustomButton type="submit">Done</CustomButton>
                </form>
            </div>
        </Modal>
    );
};

export default React.memo(ProductModalForm);
