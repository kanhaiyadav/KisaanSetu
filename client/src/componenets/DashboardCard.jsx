const DashboardCard = ({ heading, subHeading, children, className }) => {
    return (
        <div className={`flex flex-col items-center p-6 bg-white gap-2
            shadow-[0px_0px_3px_rgba(0,0,0,0.2)] rounded-xl
            ${className}
            `}>
            <div className="mb-4 text-left w-full">
                <h1 className="text-xl text-gray-800 font-semibold">{heading}</h1>
                <i className="text-gray-500">{subHeading}</i>
            </div>
            {children}
        </div>
    )
}

export default DashboardCard;