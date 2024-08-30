import ProductCard from "./ProductCard"
import { products } from "./data"
import Header from "../../componenets/DashboardHeader"

const Products = () => {
    return (
        <div className={`flex-1 flex flex-col `}>
            <Header title={'Products'} />
            <main className={`flex-1 columns-1 sm:columns-2 md:columns-3 lg:columns-4 overflow-auto p-4 gap-4 space-y-6`}>
                {products.map((product, index) => <ProductCard key={index} product={product} />)}
            </main>
        </div>
    )
}

export default Products