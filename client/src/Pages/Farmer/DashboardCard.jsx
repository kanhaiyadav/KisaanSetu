import Card from "../../componenets/Card";

const DashboardCard = ({ heading, subHeading, children, className}) => {
    return (
        <Card intent={'full'} className={className}>
            <div className="mb-1 md:mb-2 xl:mb-4 text-left w-full ">
                <h1 className="text-lg md:text-xl text-gray-700 font-semibold">{heading}</h1>
                <i className="text-gray-500 md:text-md text-sm">{subHeading}</i>
            </div>
            {children}
        </Card>
    )
}

export default DashboardCard;