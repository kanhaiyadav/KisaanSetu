import { Link } from "react-router-dom";
import { Sale } from "../../types/redux";

const TransactionCard = ({ sale, bg, ...otherProps }: {
    index?: number;
    sale: Sale;
    bg?: string;
}) => {
    console.log(sale);
    return (
        <div
            {...otherProps}
            className={`flex flex-col border-b-4
        ${bg} p-2 rounded-lg h-fit shadow-lg`}
        >
            <div className="flex items-center gap-2 sm:gap-4">
                <Link
                    to={"../products"}
                    className="text-md font-semibold font-sans text-orange-600 whitespace-nowrap"
                >
                    {sale.productName}
                </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <p className="text-xs text-gray-700 whitespace-nowrap">
                    Quantity:{" "}
                    <span className="font-semibold text-gray-800">
                        {sale.quantity}
                        {sale.stocksUnit}
                    </span>
                </p>
                <p className="text-xs text-gray-700 whitespace-nowrap">
                    Total:{" "}
                    <span className="font-semibold text-gray-800">
                        ₹{sale.total}
                    </span>
                </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <p className="text-xs text-gray-700 whitespace-nowrap">
                    <span className="font-semibold text-gray-800">
                        {sale.customer}
                    </span>
                </p>
                <p className="text-xs text-gray-700 whitespace-nowrap">
                    {sale.date.split("T")[0]}
                </p>
            </div>
        </div>
    );
};

export default TransactionCard;