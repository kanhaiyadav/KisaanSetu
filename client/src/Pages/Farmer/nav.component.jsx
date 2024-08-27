import { useState } from "react";
import Logo from "../../componenets/Logo/Logo.component";
import NavItem from "../../componenets/NavItem/NavItem.component";
import CustomButton from "../../componenets/CutomeButton/CustomButton.component";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineProduct } from "react-icons/ai";
import { IoAnalytics } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

const Nav = () => {
    const [expanded] = useState(false);
    return (
        <nav className={`${expanded?'w-[235px]': 'w-[50px]'} h-full shadow-[2px_2px_5px_2px_rgba(0,0,0,0.2)] 
                box-border ${expanded ? 'p-4' : 'p-1'} pt-0 flex flex-col transition-all duration-300 ease-in-out
                pb-4
                `}
        >
            <header className="border-b-[2px] border-dashed border-primary">
                <Logo expanded={expanded} />
            </header>
            <section className="flex flex-col gap-5 pt-4 pb-4">
                <NavItem className={`${expanded?'': 'justify-center'}`}>
                    <MdOutlineDashboard />
                    {
                        expanded ?
                            <span>Dashboard</span>
                            : null
                    }
                </NavItem>
                <NavItem className={`${expanded?'': 'justify-center'}`}>
                    <AiOutlineProduct />
                    {
                        expanded ?
                            <span>Products</span>
                            : null
                    }
                </NavItem>
                <NavItem className={`${expanded?'': 'justify-center'}`}>
                    <BsCart4 />
                    {
                        expanded ?
                            <span>Orders</span>
                            : null
                    }
                </NavItem>
                <NavItem className={`${expanded?'': 'justify-center'}`}>
                    <IoAnalytics />
                    {
                        expanded ?
                            <span>Sales Analytics</span>
                            : null
                    }
                </NavItem>
                <NavItem className={`${expanded?'': 'justify-center'}`}>
                    <LuLogOut />
                    {
                        expanded ?
                            <span>LogOut</span>
                            : null
                    }
                </NavItem>
            </section>
            {
                !expanded ?
                    <div className={`mt-[auto] w-[40px] h-[40px] rounded-full border-white overflow-hidden
                        `}>
                        <img src="/Farmer.png" alt="" className="w-full h-full" />
                    </div>
                    :
                    <footer className={`mt-[auto] w-full flex flex-col items-center justify-center gap-2
                        text-center shadow-[2px_2px_2px_rgba(0,0,0,0.2)] bg-[#efefef] text-[gray] rounded-lg
                        p-4 pt-0
                    `}>
                        <div className={`w-[80px] h-[80px] rounded-full border-[8px] border-white overflow-hidden
                            mt-[-30px]
                        `}>
                            <img src="/Farmer.png" alt="" className="w-full h-full" />
                        </div>
                        <div>
                            <h1 className="text-lg">Your Name</h1>
                            <i className="text-sm">Your Email address</i>
                            <CustomButton style={{ margin: "15px 0px" }}>Your Profile</CustomButton>
                        </div>
                    </footer>
            }
        </nav>
    )
}

export default Nav;