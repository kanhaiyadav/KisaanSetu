const Card = ({ title1, title2, description, img, ...otherProps }) => {
    return (
        <div
            className={`p-2 cursor-default flex bg-white rounded-md items-center h-[90px] xs:h-[110px] lg:h-[130px] xl:h-[150px] w-[220px] xs:w-[240px] lg:w-[310px] xl:w-[380px] 
            overflow-hidden gap-2 lg:gap-8 shadow-[0px_3px_5px_2px_rgba(0,0,0,0.2)]`}
            {...otherProps}
        >
            <div className="card-header flex-1 w-[200px]">
                <h2 className="text-[16px] xs:text-[20px] leading-[20px] lg:text-xl xl:text-3xl font-semibold text-gray-700 font-sans">{title1}</h2>
                <h2 className="text-[16px] xs:text-[20px] leading-[20px] lg:text-xl xl:text-3xl font-semibold text-gray-800 font-sans">{title2}</h2>
                <p className="text-[10px] mt-1 xs:text-xs lg:text-sm xl:text-md text-gray-600 leading-[12px] xs:leading-[13px] lg:leading-[18px]">{description}</p>
            </div>
            <div className="h-[120%] grow-0">
                <img src={img} alt="" className="w-full h-full" />
            </div>
        </div>
    );
};

export default Card;
