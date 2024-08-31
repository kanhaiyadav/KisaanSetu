import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const flip = {
    hidden: {
        transform: "scale(0) rotateX(-360deg)",
        opacity: 0,
        transition: {
            delay: 0.3,
        },
    },
    visible: {
        transform: " scale(1) rotateX(0deg)",
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        transform: "scale(0) rotateX(360deg)",
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const Modal = ({ children, onClick, ...otherProps }) => {
    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-screen h-screen z-[1000] bg-[#000000e1] flex justify-center items-center box-border"
            onClick={onClick}
            {...otherProps}
        >
            <motion.div className="bg-gray-100 p-8 rounded-xl shadow-lg"
                variants={flip}
                initial='hidden'
                animate='visible'
                exit='exit'
                onClick={(e) => { e.stopPropagation(); }}
            >
                {children}
                <span className="text-xl absolute top-2 right-2  hover:bg-red-500 p-1 rounded-md hover:text-white"
                    onClick={onClick}
                ><RxCross2 /></span>
            </motion.div>
        </div>,
        document.getElementById('modal-root') // Ensure there's a div with this ID in your HTML
    );
};

export default Modal;
