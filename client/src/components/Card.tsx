import { cva } from "class-variance-authority"
import { twMerge } from 'tailwind-merge'
import { motion } from "framer-motion";

const styles = cva(
    `flex flex-col p-[10px] xs:p-6 bg-white gap-2 shadow-sm
    rounded-xl
    `,
    {
        variants: {
            intent: {
                fitContent: 'w-[fit-content] h-[fit-content]',
                full: 'w-full h-full',
            },
        },
        defaultVariants: {
            intent: 'fitContent',
        },
    }
);

type intent = 'fitContent' | 'full';

interface CardProps {
    intent?: intent,
    children: React.ReactNode,
    className?: string,
    onClick?: () => void,
    initial?: any,
    animate?: any,
    exit?: any,
    transition?: any,
    whileTap?: any,
    whileInView?: any,
    viewport?: any,
    otherProps?: any
}

const Card = ({ intent, children, className, ...otherProps }: CardProps) => {
    return (
        <motion.section className={twMerge(styles({ intent: intent }), className)}
            {...otherProps}
        >
            {children}
        </motion.section>
    )
}

export default Card;