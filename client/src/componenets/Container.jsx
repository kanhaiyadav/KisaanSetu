import { motion } from "framer-motion";

const Container = ({ children, ...otherProps }) => {
    return (
        <motion.div
            className={`flex flex-col justify-center items-center p-8 bg-white
            shadow-[0px_0px_3px_rgba(0,0,0,0.2)] w-[fit-content] rounded-xl `}
            {...otherProps}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 150}}
        >
            {children}
        </motion.div>
    );
};

export default Container;
