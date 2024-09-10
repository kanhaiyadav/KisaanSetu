import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/product/product.selector";
import ProductForm from "./ProductForm";

const Sales = () => {
    const products = useSelector(selectProducts);

    return (
        <div className="flex-1 p-8 flex flex-col gap-4">
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
