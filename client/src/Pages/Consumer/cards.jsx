import { motion } from "framer-motion";

const Card = ({ title1, title2, description, img, ...otherProps }) => {
    const childVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 120,
            }
        },
    };
    return (
        <motion.div
            className={`p-2 cursor-default flex bg-white rounded-md items-center h-[160px] 
            overflow-hidden gap-8 z-10 shadow-md hover:shadow-[0px_8px_15px_2px_#96c54bb9]`}
            {...otherProps}
            variants={childVariants} // Only set variants here
            whileHover={{ scale: 1.1, translateY: -35 }}
            while
        >
            <div className="card-header flex-1 w-[200px]">
                <h2 className="text-3xl font-semibold text-gray-700 font-sans">{title1}</h2>
                <p className="text-3xl font-semibold text-gray-800 font-sans">{title2}</p>
                <p className="text-gray-600">{description}</p>
            </div>
            <div className="h-[120%] grow-0">
                <img src={img} alt="" className="w-full h-full" />
            </div>
        </motion.div>
    );
};

export default Card;
