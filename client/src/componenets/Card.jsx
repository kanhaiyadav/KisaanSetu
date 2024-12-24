import { cva } from "class-variance-authority"
import { twMerge } from 'tailwind-merge'
import { motion } from "framer-motion";

const styles = cva(
    `flex flex-col p-[10px] xs:p-6 bg-white gap-2 shadow-[0px_0px_3px_rgba(0,0,0,0.2)]
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
            intent: 'fit-content',
        },
    }
);

const Card = ({ intent, children, className, ...otherProps }) => {
    return (
        <motion.section className={twMerge(styles({ intent: intent }), className)}
            {...otherProps}
        >
            {children}
        </motion.section>
    )
}

export default Card;