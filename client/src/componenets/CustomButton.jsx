import { cva } from "class-variance-authority";

const styles = cva(
    `p-4 pt-2 pb-2 rounded-md transition-all duration-250 ease-in-out w-[fit-content] h-[fit-content]
    hover:scale-105 hover:shadow-md active:scale-90 overflow-hidden whitespace-nowrap
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
    <button className={styles({intent, size})} {...props}>
        {children}
    </button>
);

export default CustomButton;