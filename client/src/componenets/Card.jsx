import { cva } from "class-variance-authority"
import { twMerge } from 'tailwind-merge'

const styles = cva(
    `flex flex-col items-center p-6 bg-white gap-2 shadow-[0px_0px_3px_rgba(0,0,0,0.2)]
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

const Card = ({ intent, children, className }) => {
    return (
        <div className={twMerge(styles({ intent: intent}), className)}>
            {children}
        </div>
    )
}

export default Card;