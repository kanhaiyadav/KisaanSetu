const Container = ({ children, ...otherProps }) => {
    return (
        <div
            className="flex flex-col justify-center items-center p-8 shadow-md w-[clamp(300px,70%,500px)] rounded-lg animate-slideIn"
            {...otherProps}
        >
            {children}
        </div>
    );
};

export default Container;
