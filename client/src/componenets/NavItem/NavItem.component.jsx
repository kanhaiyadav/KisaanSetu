const NavItem = ({children, className}) => {
    return (
        <div className={`w-full p-2 text-[grey] rounded-md hover:bg-primary hover:text-white text-xl
            flex items-center gap-2 cursor-pointer transition-all duration-[250ms] ease-in-out 
            ${className} 
        `}>
            {children}
        </div>
    )
}

export default NavItem;