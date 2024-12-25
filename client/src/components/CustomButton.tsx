import { cva } from "class-variance-authority";
import { motion } from "framer-motion";

const styles = cva(
    `relative px-4 py-2 rounded-md w-[fit-content] h-[fit-content] flex justify-center items-center
     hover:shadow-md overflow-hidden whitespace-nowrap gap-0
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

const CustomButton = ({ intent, size, children, ...props }: {
    intent?: 'primary' | 'danger' | 'style',
    size?: 'sm' | 'md' | 'lg' | 'xl',
    children: React.ReactNode,
    props?: any
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    onClick?: () => void
    style?: React.CSSProperties
}) => (
    <motion.button className={styles({ intent, size })}
        type="button"
        {...props}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition= {{ duration: 0.3, type: "spring", stiffness: 220, damping: 20 }}
    >
        {children}
    </motion.button>
);

export default CustomButton;