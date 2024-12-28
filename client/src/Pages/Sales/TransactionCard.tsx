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
                    className="text-md lg:text-lg font-semibold font-sans text-orange-600"
                >
                    {sale.productName}
                </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <p className="text-xs lg:text-sm text-gray-700">
                    Quantity:{" "}
                    <span className="font-semibold text-gray-800">
                        {sale.quantity}
                        {sale.stocksUnit}
                    </span>
                </p>
                <p className="text-xs lg:text-sm text-gray-700">
                    Total:{" "}
                    <span className="font-semibold text-gray-800">
                        ₹{sale.total}
                    </span>
                </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <p className="text-xs lg:text-sm text-gray-700">
                    <span className="font-semibold text-gray-800">
                        {sale.customer}
                    </span>
                </p>
                <p className="text-xs lg:text-sm text-gray-700">
                    {sale.date.split("T")[0]}
                </p>
            </div>
        </div>
    );
};

export default TransactionCard;