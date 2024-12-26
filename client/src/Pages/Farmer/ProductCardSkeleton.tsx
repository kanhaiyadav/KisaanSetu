import Skeleton from "react-loading-skeleton";
import Card from "@/components/Card";
import OptionHeader from "@/components/OptionHeader";
import { HiChevronUpDown } from "react-icons/hi2";
import { MdOutlineSearch } from "react-icons/md";

const ProductCardSkeleton = ({
    type,
    cards,
}: {
    type: "farmer" | "consumer";
    cards: number;
}) => {
    return (
        <>
            <div className="flex mx-4 gap-4 md:gap-8 items-center pb-4 pt-2">
                <div className="flex hover:bg-primary cursor-default hover:text-white text-gray-600 gap-1 items-center justify-center px-2 py-0 border-2 hover:border-primary border-gray-600 rounded-lg">
                    <span className="text-xl md:text-3xl ">+</span>
                    <span className="text-md md:text-xl">New</span>
                </div>
                <div className="relative text-md md:text-xl cursor-default text-gray-600 flex md:gap-1 items-center justify-center">
                    <span>Sort</span>
                    <span>
                        <HiChevronUpDown className="text-md" />
                    </span>
                </div>
                <div className="text-md md:text-xl text-gray-600 flex md:gap-1 items-center justify-center">
                    <span>View</span>
                    <span>
                        <HiChevronUpDown className="text-md" />
                    </span>
                </div>
                <form className="ml-auto   px-1 flex items-center justify-center outline outline-gray-600 focus-within:outline-gray-700 outline-2 rounded-lg">
                    <input
                        disabled
                        type="text"
                        placeholder="Search"
                        className="flex-1 text-md md:text-xl w-[100px] md:w-[200px] bg-transparent text-gray-600 px-2 py-1 border-none outline-none"
                    />
                    <MdOutlineSearch className="text-xl md:text-2xl text-gray-600" />
                </form>
            </div>
            <div
                className={`flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 
                    xl:grid-cols-5 overflow-auto p-4 gap-2 xs:gap-4`}
            >
                {Array(cards)
                    .fill(null)
                    .map((_, index) => (
                        <Card
                            intent={"fitContent"}
                            key={index}
                            className={`max-w-[800px] relative flex ${
                                type == "farmer"
                                    ? "flex-row xs:flex-col"
                                    : "flex-row"
                            } w-full cursor-default`}
                        >
                            <div
                                className={` ${
                                    type === "farmer"
                                        ? "w-[100px] xs:w-full aspect-square rounded-t-xl"
                                        : "h-[150px] sm:h-[200px] aspect-square md:aspect-video lg:aspect-square xl:aspect-video rounded-xl"
                                } object-cover `}
                            >
                                <Skeleton className="w-full h-full aspect-square object-cover rounded-t-xl" />
                            </div>
                            <div className="flex-1">
                                {/* {type === "consumer" && (
                        <div>
                            <div className="flex items-center gap-2">
                                <img
                                    src={product.farmer.avatar}
                                    alt={product.farmer.name}
                                    className="w-8 sm:w-10 h-8 sm:h-10 rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)] p-1"
                                />
                                <h2 className="text-lg sm:text-2xl hover:underline hover:text-primary font-semibold text-gray-600 font-sans">
                                    {product.farmer.name}
                                </h2>
                            </div>
                            <div className="flex gap-2 sm:gap-4 items-center py-1 sm:py-2">
                                <IoCall className="hover:bg-primary hover:text-white transition-all text-sm sm:text-xl text-primary p-[5px] sm:p-2 box-content rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)]" />
                                <TbMessage className="hover:bg-primary hover:text-white transition-all text-sm sm:text-xl text-primary p-[5px] sm:p-2 box-content rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)]" />
                                <button className="hover:bg-primary hover:text-white transition-all sm:text-md text-sm text-primary p-[5px] sm:p-2 px-4 rounded-full shadow-[1px_1px_2px_2px_rgba(0,0,0,0.1)]">
                                    Reviews
                                </button>
                            </div>
                        </div>
                    )} */}
                                <div className="sm:pt-2 w-full flex justify-between items-center">
                                    <div>
                                        <Skeleton width={120} height={20} />
                                        <Skeleton width={100} height={30} />
                                    </div>

                                    {type === "farmer" && (
                                        <Skeleton
                                            circle={true}
                                            height={45}
                                            width={45}
                                        />
                                    )}
                                </div>
                                <Skeleton width={150} height={20} />
                                {type === "consumer" && (
                                    <Skeleton width={70} height={15} />
                                )}
                            </div>
                            <div className="overflow-hidden rounded-full absolute right-2 bottom-2 flex items-center font-sans text-gray-600 shadow-[1px_1px_2px_1px_rgba(0,0,0,0.1)] text-xs sm:text-md">
                                <Skeleton
                                    width={50}
                                    height={20}
                                    className="px-2 py-1"
                                />
                            </div>
                        </Card>
                    ))}
            </div>
        </>
    );
};

export default ProductCardSkeleton;
