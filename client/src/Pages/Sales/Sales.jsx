import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSales } from "../../redux/product/product.slice";
import { selectProducts, selectSales } from "../../redux/product/product.selector";
import ProductForm from "./ProductForm";
import Header from "../../componenets/DashboardHeader";
import { selectUserInfo } from "../../redux/user/selectors";
import TransactionCard from "./TransactionCard";


const Sales = () => {
    const colors = ['bg-red-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-indigo-200', 'bg-purple-200', 'bg-pink-200', 'bg-gray-300', 'bg-red-200', 'bg-yellow-200', 'bg-green-300', 'bg-blue-300', 'bg-indigo-300', 'bg-purple-300', 'bg-pink-300', 'bg-gray-400', 'bg-red-200', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-indigo-200', 'bg-purple-200', 'bg-pink-200', 'bg-gray-300', 'bg-red-200', 'bg-yellow-200', 'bg-green-300', 'bg-blue-300', 'bg-indigo-300', 'bg-purple-300', 'bg-pink-300', 'bg-gray-400'];
    const products = useSelector(selectProducts);
    const sales = useSelector(selectSales);
    const user = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getSales(user._id));
    }, [dispatch, user._id]);
    return (
        <div className="flex-1 p-8 pt-0 flex flex-col gap-8 overflow-auto">
            <Header title="Sales" className="" />
            <section>
                <h1 className="mb-[10px] text-primary text-3xl font-bold font-sans">New Transaction</h1>
                <ProductForm product={products[0]} />
            </section>
            <section>
                <h1 className="mb-[10px] text-primary text-3xl font-bold font-sans">Transaction</h1>
                <div className="flex gap-4 pl-[10px] flex-wrap justify-around bg-gray-100 p-4 rounded-xl shadow-sm max-h-[80vh] overflow-auto">
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
