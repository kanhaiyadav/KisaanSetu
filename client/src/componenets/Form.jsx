const Form = ({ children, ...otherProps }) => {
    return (
        <form
            className="flex flex-col gap-2.5 w-[400px]"
            {...otherProps}
        >
            {children}
        </form>
    );
};

export default Form;
