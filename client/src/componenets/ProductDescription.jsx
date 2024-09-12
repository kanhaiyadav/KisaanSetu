const ProductDescription = ({ product }) => {
    return (
        <>
            <div className="h-[550px] w-[85vw] flex">
                <div className="flex items-center justify-center">
                    <img src={'http://localhost:3000' + product.image} alt="product" className="w-1/2 h-1/2" />
                </div>
                <div className="w-1/2 h-1/2 flex items-center justify-center">
                    <div className="w-1/2 h-1/2 flex flex-col items-center justify-center">
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProductDescription;