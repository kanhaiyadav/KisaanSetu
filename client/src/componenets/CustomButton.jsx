import { cva } from "class-variance-authority";
import { motion } from "framer-motion";

const styles = cva(
    `p-4 pt-2 pb-2 rounded-md w-[fit-content] h-[fit-content]
     hover:shadow-md overflow-hidden whitespace-nowrap
    `,
    {
        variants: {
            intent: {
                primary: 'bg-primary text-white',
                danger: 'bg-danger text-white',
                style: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
            },
            size: {
                sm: 'text-sm',
                md: 'text-md',
                lg: 'text-lg',
                xl: 'text-xl',
            },
        },
        defaultVariants: {
            intent: 'primary',
            size: 'lg',
        },
    }
);

const CustomButton = ({intent, size, children, ...props }) => (
    <motion.button className={styles({ intent, size })} {...props}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition= {{ duration: 0.3, type: "spring", stiffness: 220, damping: 10 }}
    >
        {children}
    </motion.button>
);

export default CustomButton;