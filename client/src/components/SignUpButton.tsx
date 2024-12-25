const SignUpButton = ({ children, ...props }: {
    children: React.ReactElement,
    props?: any
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    onClick?: () => void
    style?: React.CSSProperties
}) => {
    return <button {...props} className={`p-2 text-[1.2rem] bg-[#d39a57] border-none 
        rounded-md transition duration-300 ease-in-out shadow-md font-[Poppins] text-white hover:bg-brown 
    `}>{children}</button>;
};

export default SignUpButton;