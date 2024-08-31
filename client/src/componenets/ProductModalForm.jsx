import { useState } from "react";
import CustomButton from "./CustomButton";
import Modal from "./Modal";
import "./styles.css";
import { FaUpload } from "react-icons/fa6";


const ProductModalForm = ({ product, close }) => {
    const { name, price, image, remainingStock } = product;
    // const [selectedImage, setSelectedImage] = useState(null);
    const [setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Function to handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            // Set the selected image state
            setSelectedImage(file);

            // Create a FileReader to read the file
            const reader = new FileReader();
            reader.onload = () => {
                // Set the preview URL to the result of FileReader
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    return (
        <Modal onClick={close}>
            <div className="flex flex-col gap-4">
                <form className="flex flex-col gap-4 w-[350px] text-center">
                    <div className="flex gap-6 items-center">
                        {
                            previewUrl || image ? <img src={previewUrl || image} alt="Selected Image" className="h-[70px] object-cover rounded-md" />
                                : null
                        }
                        <CustomButton>
                            {
                                previewUrl || image?
                                <label htmlFor="image" className="flex items-center justify-center gap-2">Change Image <FaUpload /></label>
                                    :
                                <label htmlFor="image" className="flex items-center justify-center gap-2">Upload Image <FaUpload /></label>
                            }
                        </CustomButton>
                        <input type="file" id="image" accept="image/*" hidden onChange={handleFileChange} required/>
                    </div>
                    <div className="w-full flex flex-col items-start gap-1">
                        <label htmlFor="name" className="text-md">Product Name: </label>
                        <input type="text" id="name" placeholder="tomato" value={name} className="PhoneInputInput w-full box-border" required/>
                    </div>
                    <div className="w-full flex flex-col items-start gap-1">
                        <label htmlFor="price" className="text-md">Price per unit: </label>
                        <input type="number" id="price" placeholder="500" value={price} className="PhoneInputInput w-full box-border" required/>
                    </div>
                    <div className="w-full flex flex-col items-start gap-1">
                        <label htmlFor="stocks" className="text-md">Number of stocks: </label>
                        <input type="number" id="stocks" placeholder="205 kg" value={remainingStock} className="PhoneInputInput w-full box-border" required/>
                    </div>
                    {
                            <CustomButton type="submit">Done</CustomButton>
                    }
                </form>
            </div>
        </Modal>
    );
};

export default ProductModalForm;