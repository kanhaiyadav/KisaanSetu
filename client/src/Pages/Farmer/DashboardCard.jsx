import Card from "../../componenets/Card";

const DashboardCard = ({ heading, subHeading, children, className}) => {
    return (
        <Card intent={'full'} className={className}>
            <div className="mb-4 text-left w-full">
                <h1 className="text-xl text-gray-800 font-semibold">{heading}</h1>
                <i className="text-gray-500">{subHeading}</i>
            </div>
            {children}
        </Card>
    )
}

export default DashboardCard;