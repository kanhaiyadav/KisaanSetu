import { useSelector } from "react-redux";
import { selectSearchedProducts } from "../../redux/product/product.selector";
import ProductCard from "../Farmer/ProductCard";

const ProductListingPage = () => {
    const products = useSelector(selectSearchedProducts);
    return (
        <div className={`w-screen ${products.length > 0 ? 'grid grid-cols-5 gap-6' : 'flex items-center justify-center'} p-10`}>
            {
                products.length?
                products.map((product, index) => <ProductCard key={index} product={product} type={'consumer'}/>)
                    :
                    <div className='w-full flex flex-col items-center justify-center relative'>
                        <img src="/no_data.png" alt="" className='w-[300px] h-[300px]' />
                        <p className='text-[#a2a2a2] text-md  mt-[-50px]'>No products found</p>
                    </div>
            }
        </div>
    )
}

export default ProductListingPage;