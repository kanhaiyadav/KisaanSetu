import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/product/product.selector";
import ProductForm from "./ProductForm";
import Header from "../../componenets/DashboardHeader";

const Sales = () => {
    const products = useSelector(selectProducts);

    return (
        <div className="flex-1 p-8 pt-0 flex flex-col gap-4">
            <Header title="Sales" className=""/>
            <div className="grid grid-cols-[50px_150px_auto_auto_auto_100px] border-b-2 border-gray-600 justify-items-center">
                <div className="text-xl font-bold text-gray-800 font-poppins">SL</div>
                <div className="text-xl font-bold text-gray-800 font-poppins">Product</div>
                <div className="text-xl font-bold text-gray-800 font-poppins">Price(₹)</div>
                <div className="text-xl font-bold text-gray-800 font-poppins">Quantity</div>
                <div className="text-xl font-bold text-gray-800 font-poppins">Total(₹)</div>
                <div className="text-xl font-bold text-gray-800 font-poppins">Action</div>
            </div>
            {products.map((product, index) => (
                <ProductForm
                    key={index}
                    product={product}
                    index={index}
                />
            ))}
        </div>
    );
};

export default Sales;
