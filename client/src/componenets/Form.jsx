const Form = ({ children, ...otherProps }) => {
    return (
        <form
            className="flex flex-col gap-2.5 w-[280px] sm:w-[300px] lg:w-[400px]"
            {...otherProps}
        >
            {children}
        </form>
    );
};

export default Form;
