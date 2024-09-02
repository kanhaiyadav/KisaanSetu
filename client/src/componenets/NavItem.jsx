import { NavLink } from "react-router-dom";

const NavItem = ({children, className, to, ...otherProps}) => {
    return (
        <NavLink end to={to} className={`w-full h-[45px] p-2 text-gray-600 rounded-md hover:bg-[#efefef] text-xl
            flex items-center gap-2 cursor-pointer transition-all duration-200 ease-in-out active:scale-90
            ${className} 
        `}
            style={({ isActive }) => ({
                backgroundColor: isActive ? '#97c54b' : '',
                color: isActive ? 'white' : ''
            })
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    )
}

export default NavItem;