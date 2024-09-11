const Card = ({title1, title2, description, img}) => {
    return (
        <div className={`p-2 flex bg-white rounded-md items-center h-[160px] overflow-hidden gap-8 z-10
            shadow-md
        `}>
            <div className="card-header flex-1 w-[200px]">
                <h2 className="text-3xl font-semibold text-gray-700 font-sans">{title1}</h2>
                <p className="text-3xl font-semibold text-gray-800 font-sans">{title2}</p>
                <p className="text-gray-600">{description}</p>
            </div>
            <div className="h-[120%] grow-0">
                <img src="/vegetables.png" alt="" className="w-full h-full"/>
            </div>
        </div>
    );
}

export default Card;