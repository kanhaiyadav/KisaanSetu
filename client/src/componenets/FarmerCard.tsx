import { FaStar } from "react-icons/fa6";
const FarmerCard = ({ farmer }) => {
    return (
        <div className="w-[110px] xs:w-[200px] md:w-[300px] rounded-[15px] xs:rounded-[30px] overflow-hidden bg-white shadow-[0px_0px_7px_3px_rgba(0,2,0,0.2)]">
            <img src={farmer.avatar} alt="" className="w-full aspect-square object-cover object-center rounded-[15px] xs:rounded-[30px]"/>
            <div className="flex justify-between p-2 xs:px-4 py-2 xs:py-4">
                <h2 className="text-xs max-w-[60%] overflow-ellipsis overflow-hidden text-nowrap xs:text-md md:text-xl font-semibold font-poppins text-gray-600">{farmer.name}</h2>
                <span className="text-xs xs:text-md md:text-xl">{farmer.rating}<FaStar className="text-[#FFD700] text-xs xs:text-md md:text-xl inline ml-1 mb-1" /></span>
            </div>
        </div>
    );
};

export default FarmerCard;