import { useState } from "react";
import { useSelector } from "react-redux";
import {
    selectProducts,
    selectSales,
} from "../../redux/product/product.selector";
import TransactionCard from "./TransactionCard";
import OptionHeader from "./SalesOptionHeader";
import { colors } from "@/constant";

const Sales = () => {
    
    let sales = useSelector(selectSales);
    console.log(sales);
    const [sortItem, setSortItem] = useState("product name");
    const [acending, setAcending] = useState(true);
    if (sortItem === "total")
        acending
            ? (sales = sales.slice().sort((a, b) => a.total - b.total))
            : (sales = sales.slice().sort((a, b) => b.total - a.total));
    else if (sortItem === "product name")
        acending
            ? (sales = sales
                  .slice()
                  .sort((a, b) => a.productName.localeCompare(b.productName)))
            : (sales = sales
                  .slice()
                  .sort((a, b) => b.productName.localeCompare(a.productName)));
    else if (sortItem === "customer name")
        acending
            ? (sales = sales
                  .slice()
                  .sort((a, b) => a.customer.localeCompare(b.customer)))
            : (sales = sales
                  .slice()
                  .sort((a, b) => b.customer.localeCompare(a.customer)));
    else if (sortItem === "sold date")
        acending
            ? (sales = sales
                  .slice()
                  .sort(
                      (a, b) =>
                          new Date(a.date).getTime() -
                          new Date(b.date).getTime()
                  ))
            : (sales = sales
                  .slice()
                  .sort(
                      (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
                  ));
    else
        acending
            ? (sales = sales.slice().sort((a, b) => a.quantity - b.quantity))
            : (sales = sales.slice().sort((a, b) => b.quantity - a.quantity));
    return (
        <div className="flex-1 bg-blue-12 flex flex-col h-screen">
            <OptionHeader
                acending={acending}
                setAcending={setAcending}
                currSortItem={sortItem}
                setSortItem={setSortItem}
                sortItems={[
                    "product name",
                    "total",
                    "quantity",
                    "sold date",
                    "customer name",
                ]}
                scrollDivID={"salesList"}
            />

            <section className="flex-1 pb-[70px] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-[20px] auto-rows-min">
                {/* <div className="grid grid-cols-7 gap-4 flex-wrap justify-around bg-gray-100 p-[20px] rounded-xl shadow-sm max-h-[88vh] overflow-auto w-fit"> */}
                {sales === undefined ? (
                    <h1 className="text-center text-xl w-full">No sales yet</h1>
                ) : (
                    sales.map((sale, index) => (
                        <TransactionCard
                            index={index}
                            key={sale._id}
                            sale={sale}
                            bg={
                                colors[
                                    Math.floor(Math.random() * colors.length)
                                ]
                            }
                        />
                    ))
                )}
            </section>
        </div>
    );
};

export default Sales;
