import Card from "../../componenets/Card";

const ProductCard = ({ product }) => {
    const { name, price, image, remainingStock } = product;
    return (
        <Card intent={'fitContent'} className="break-inside-avoid relative hover:border-primary border-2 hover:shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
            <img src={image} alt={name} className="w-full object-cover rounded-t-xl" />
            <div className="pt-2 w-full">
                
                <h1 className="text-lg font-semibold text-gray-800">{name}</h1>
                <p className="text-gray-500 text-2xl">₹{price}</p>
                <div className="absolute bg-primary top-0 right-6 p-2 min-h-[50px] rounded-b-2xl">{remainingStock}</div>
            </div>
        </Card>
    );
};
    
export default ProductCard;