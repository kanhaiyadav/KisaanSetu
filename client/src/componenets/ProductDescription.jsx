import Modal from "./Modal";

const ProductDescription = ({ product, close }) => {
    return (
        <Modal onClick={close} className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-1/2 h-1/2 flex items-center justify-center">
                <img src={product.image} alt="product" className="w-1/2 h-1/2" />
            </div>
            <div className="w-1/2 h-1/2 flex items-center justify-center">
                <div className="w-1/2 h-1/2 flex flex-col items-center justify-center">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    <button className="w-1/2 h-1/2 bg-green-500" onClick={() => { }}>
                        Add to cart
                    </button>
                </div>
            </div>
        </Modal>
    )
};

export default ProductDescription;