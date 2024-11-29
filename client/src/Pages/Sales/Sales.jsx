import { useState } from "react";
import { useSelector} from "react-redux";
import { selectProducts, selectSales } from "../../redux/product/product.selector";
import ProductForm from "./ProductForm";
import Header from "../../componenets/DashboardHeader";
import TransactionCard from "./TransactionCard";
import OptionHeader from "../../componenets/OptionHeader";
import Modal from "../../componenets/Modal";

const Sales = () => {
    const [clicked, setClicked] = useState(false);
    const colors = ['bg-red-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-indigo-200', 'bg-purple-200', 'bg-pink-200', 'bg-gray-300', 'bg-red-200', 'bg-yellow-200', 'bg-green-300', 'bg-blue-300', 'bg-indigo-300', 'bg-purple-300', 'bg-pink-300', 'bg-gray-400', 'bg-red-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-indigo-200', 'bg-purple-200', 'bg-pink-200', 'bg-gray-300', 'bg-red-200', 'bg-yellow-200', 'bg-green-300', 'bg-blue-300', 'bg-indigo-300', 'bg-purple-300', 'bg-pink-300', 'bg-gray-400'];
    const products = useSelector(selectProducts);
    const sales = useSelector(selectSales);
    console.log(sales);
    
    return (
        <div className="flex-1 flex flex-col h-screen">
            
            <Header title="Sales" className="" />

            <OptionHeader onNew={() => { setClicked(true) }} />
            

            {
                clicked && (
                    <Modal onClick={()=>{setClicked(false)}}>
                        <ProductForm product={products[0]} close={()=>{setClicked(false)}} />
                    </Modal>
                )
            }


            <section className="flex-1 pb-[70px] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-[20px]">
                {/* <div className="grid grid-cols-7 gap-4 flex-wrap justify-around bg-gray-100 p-[20px] rounded-xl shadow-sm max-h-[88vh] overflow-auto w-fit"> */}
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
            </section>

        </div>
    );
};

export default Sales;
