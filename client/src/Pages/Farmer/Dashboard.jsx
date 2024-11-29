import { useState, useEffect } from "react";
import DashboardCard from "./DashboardCard";
import Header from "../../componenets/DashboardHeader";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
import { TbShoppingBagCheck } from "react-icons/tb";
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { useSelector } from "react-redux";
import { selectSales } from "../../redux/product/product.selector";


const Dashboard = () => {
    const sales = useSelector(selectSales);
    const [salesByDate, setSalesByDate] = useState({});
    useEffect(() => {
        const salesByDate = sales.reduce((acc, sale) => {
            const date = new Date(sale.date).toISOString().split('T')[0];  // Format date to YYYY-MM-DD
            if (!acc[date]) {
                acc[date] = { date: date, totalSales: 0 };
            }
            acc[date].totalSales += sale.total;
            return acc;
        }, {});
        const sortedSalesByDate = Object.values(salesByDate).sort((a, b) => new Date(a.date) - new Date(b.date));
        setSalesByDate(Object.values(sortedSalesByDate));
    }, [sales]);
    return (
        <div className="flex-1 h-full flex flex-col overflow-y-auto overflow-x-hidden">
            <Header title={'Dashboard'} />
            <main className={`flex-1 p-4 flex flex-col lg:grid grid-cols-[auto,auto]
            justify-items-center items-center gap-4`}>
                <DashboardCard heading={"Today's Summary"}>
                    <main className="flex justify-evenly w-full g-2">
                        <div className="w-[100px] md:w-[140px] text-center flex flex-col items-center bg-red-100 rounded-lg p-2">
                            <div className="w-[30px] h-[30px] bg-red-500 rounded-full grid place-items-center text-white"><FaIndianRupeeSign style={{ fontSize: '1.2rem' }} /></div>
                            <p className="text-xs md:text-lg text-gray-600">Total Revenue</p>
                            <span className="text-xl md:text-3xl font-semibold text-gray-700">5,600</span>
                        </div>
                        <div className="w-[100px] md:w-[140px] text-center flex flex-col items-center bg-green-100 rounded-lg p-2">
                            <div className="w-[30px] h-[30px] bg-green-500 rounded-full grid place-items-center text-white"><TbShoppingBagCheck style={{ fontSize: '1.2rem' }} /></div>
                            <p className="text-xs md:text-lg text-gray-600">Items Sold</p>
                            <span className="text-xl md:text-3xl font-semibold text-gray-700">122</span>
                        </div>
                        <div className="w-[100px] md:w-[140px] text-center flex flex-col items-center bg-blue-100 rounded-lg p-2">
                            <div className="w-[30px] h-[30px] bg-blue-500 rounded-full grid place-items-center text-white"><FiUserPlus style={{ fontSize: '1.2rem' }} /></div>
                            <p className="text-xs md:text-lg text-gray-600">New Customer</p>
                            <span className="text-xl md:text-3xl font-semibold text-gray-700">10</span>
                        </div>
                    </main>
                </DashboardCard>
                <DashboardCard heading={"Customer Reviews"}>
                    <div className="w-full h-[50px] bg-purple-100  rounded-lg">

                    </div>
                    <div className="w-full h-[50px] bg-yellow-100  rounded-lg">

                    </div>
                </DashboardCard>
                <DashboardCard heading={"Revenue Over Time"} className={'col-span-full'}>
                    <div className="w-full  aspect-[16/9] max-h-[40vh]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={salesByDate}
                                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                            >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="date" className="text-xs md:text-sm xl:text-md"/>
                                <YAxis className="text-xs md:text-sm xl:text-md" />
                                <Tooltip className="text-xs md:text-sm xl:text-lg" />
                                <Legend className="text-xs md:text-sm xl:text-lg" />
                                <Area type="monotone" dataKey="totalSales" stroke="#97c54b" fill="#b1df68b0" activeDot={{ r: 8 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </DashboardCard>
            </main>
        </div>
    );
}

export default Dashboard;