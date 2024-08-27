const SignUpButton = ({ children, ...props }) => {
    return <button {...props} className={`p-2 text-[1.2rem] bg-[#d39a57] border-none 
        rounded-md transition duration-300 ease-in-out shadow-md font-[Poppins] text-white hover:bg-[#fcd59d] 
        hover:text-black 
    `}>{children}</button>;
};

export default SignUpButton;