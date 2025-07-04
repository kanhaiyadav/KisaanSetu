const ProductDescription = ({ product }) => {
    return (
        <>
            <div className="h-fit w-fit flex gap-8">
                <div className="flex flex-col">
                    <div className="flex items-center justify-center w-[400px]">
                        <img
                            src={import.meta.env.VITE_BACKEND_URl + product.image}
                            alt="product"
                            className="rounded-xl w-full h-full"
                        />
                    </div>
                    <div className="w-1/2 h-1/2 flex items-center justify-center">
                        <div className="w-1/2 h-1/2 flex flex-col items-center justify-center"></div>
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-semibold text-gray-700">
                        {product.name}
                    </h1>
                </div>
            </div>
        </>
    );
};

export default ProductDescription;