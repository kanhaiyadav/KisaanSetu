import { useSelector} from "react-redux";
import { selectProducts, selectSales } from "../../redux/product/product.selector";
import ProductForm from "./ProductForm";
import Header from "../../componenets/DashboardHeader";
import TransactionCard from "./TransactionCard";

const Sales = () => {
    const colors = ['bg-red-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-indigo-200', 'bg-purple-200', 'bg-pink-200', 'bg-gray-300', 'bg-red-200', 'bg-yellow-200', 'bg-green-300', 'bg-blue-300', 'bg-indigo-300', 'bg-purple-300', 'bg-pink-300', 'bg-gray-400', 'bg-red-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-indigo-200', 'bg-purple-200', 'bg-pink-200', 'bg-gray-300', 'bg-red-200', 'bg-yellow-200', 'bg-green-300', 'bg-blue-300', 'bg-indigo-300', 'bg-purple-300', 'bg-pink-300', 'bg-gray-400'];
    const products = useSelector(selectProducts);
    const sales = useSelector(selectSales);
    console.log(sales);
    
    return (
        <div className="flex-1 p-8 pt-0 flex flex-col gap-8 overflow-auto">
            <Header title="Sales" className="" />
            <section>
                <h1 className="mb-[10px] text-primary text-3xl font-bold font-sans">Create New Transaction</h1>
                <ProductForm product={products[0]} />
            </section>
            <section>
                <h1 className="mb-[10px] text-primary text-3xl font-bold font-sans">Transactions</h1>
                <div className="grid grid-cols-6 gap-4 flex-wrap justify-around bg-gray-100 p-[20px] rounded-xl shadow-sm max-h-[88vh] overflow-auto w-fit">
                    {
                        sales === undefined ? (
                            <h1 className="text-center text-xl w-full">No sales yet</h1>
                        ) : (
                            sales.map((sale, index) => (
                                <TransactionCard
                                    index={index}
                                    key={sale._id}
                                    sale={sale}
                                    bg={colors[Math.floor(Math.random() * colors.length)]}
                                />
                            ))
                        )
                    }
                    <div className="w-full flex gap-4">
                        
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Sales;
