import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = ({ type, cards }: {
    type: 'farmer' | 'consumer',
    cards: number
}) => {
    return (
        <div className="flex-1 flex flex-col">
            <Skeleton width={'100%'} height={100} className="rounded-lg"/>
            <div className={`flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto p-4 gap-4`}>
                {
                    Array(cards).fill(null).map((_, index) => (
                        <div key={index} className="w-full flex flex-col gap-2 bg-white rounded-xl p-6 shadow-[0px_0px_3px_rgba(0,0,0,0.2)]">
                            <Skeleton className="w-full aspect-square object-cover rounded-t-xl" />
                            <div className="pt-2 w-full flex justify-between items-center">
                                <div>
                                    <Skeleton width={120} height={20} />
                                    <Skeleton width={100} height={30} />
                                </div>
                                {
                                    type === 'farmer' &&
                                    <Skeleton circle={true} height={45} width={45} />
                                }
                            </div>
                            <Skeleton width={150} height={20} />
                            {type === 'consumer' && <Skeleton width={70} height={15} />}
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default ProductCardSkeleton;