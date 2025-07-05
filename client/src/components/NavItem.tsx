import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ children, className, to, noStyle=false, ...otherProps }: {
    children: React.ReactNode,
    className?: string,
    to: string,
    noStyle?: boolean,
    otherProps?: any,
    onClick?: (e: React.MouseEvent) => void
}) => {
    return (
        <NavLink end to={to} className={`relative w-fit xs:w-full h-[35px] xs:h-[45px] p-2 text-gray-600 rounded-md ${noStyle ? "" : "hover:bg-[#efefef]"} text-xl
            xs:grid grid-cols-[auto,1fr] items-center gap-2 cursor-pointer transition-all duration-200 ease-in-out active:scale-90
            ${className} 
        `}
            style={({ isActive }) => ({
                backgroundColor: isActive && !noStyle ? '#97c54b' : '',
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