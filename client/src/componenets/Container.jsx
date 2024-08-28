const Container = ({ children, ...otherProps }) => {
    return (
        <div
            className={`flex flex-col justify-center items-center p-8 bg-white
            shadow-[0px_0px_3px_rgba(0,0,0,0.2)] w-[fit-content] rounded-xl animate-slideIn`}
            {...otherProps}
        >
            {children}
        </div>
    );
};

export default Container;
