const CustomButton = ({ children, ...props }) => (
    <button className={`bg-primary p-4 pt-2 pb-2 text-white rounded-md text-xl
        transition-all duration-250 ease-in-out hover:scale-105 hover:shadow-md active:scale-90
    `} {...props}>
        {children}
    </button>
); 

export default CustomButton;