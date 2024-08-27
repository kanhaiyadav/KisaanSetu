import { useState } from "react";
import Logo from "../../componenets/Logo";
import NavItem from "../../componenets/NavItem";
import CustomButton from "../../componenets/CustomButton";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineProduct } from "react-icons/ai";
import { IoAnalytics } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

const Nav = () => {
    const [expanded, setExpanded] = useState(true);
    return (
        <nav className={`${expanded?'w-[235px]': 'w-[50px]'} h-full shadow-[2px_2px_5px_2px_rgba(0,0,0,0.2)] 
                box-border ${expanded ? 'p-4' : 'p-1'} pt-0 flex flex-col
                pb-4 transition-all duration-300 ease-in-out
                `}
        >
            <header className="border-b-[2px] border-dashed border-primary">
                <Logo expanded={expanded} setExpanded={setExpanded} />
            </header>
            <section className="flex flex-col gap-5 pt-4 pb-4">
                <NavItem >
                    <MdOutlineDashboard className={`${expanded?'': 'ml-[3px]'}`}/>
                    {
                        expanded ?
                            <span className={`overflow-hidden whitespace-nowrap`}>Dashboard</span>
                            : null
                    }
                </NavItem>
                <NavItem >
                    <AiOutlineProduct className={`${expanded?'': 'ml-[3px]'}`}/>
                    {
                        expanded ?
                            <span className={`overflow-hidden whitespace-nowrap`}>Products</span>
                            : null
                    }
                </NavItem>
                <NavItem >
                    <BsCart4 className={`${expanded ? '' : 'ml-[3px]'}`} />
                    {
                        expanded ?
                            <span className={`overflow-hidden whitespace-nowrap`}>Orders</span>
                            : null
                    }
                </NavItem>
                <NavItem >
                    <IoAnalytics className={`${expanded?'': 'ml-[3px]'}`}/>
                    {
                        expanded ?
                            <span className={`overflow-hidden whitespace-nowrap`}>Sales Analytics</span>
                            : null
                    }
                </NavItem>
                <NavItem >
                    <LuLogOut className={`${expanded?'': 'ml-[3px]'}`}/>
                    {
                        expanded ?
                            <span className={`overflow-hidden whitespace-nowrap`}>LogOut</span>
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
                            <h1 className="text-lg overflow-hidden whitespace-nowrap">Your Name</h1>
                            <i className="text-sm overflow-hidden whitespace-nowrap">Your Email address</i>
                            <CustomButton style={{ margin: "15px 0px" }}>Your Profile</CustomButton>
                        </div>
                    </footer>
            }
        </nav>
    )
}

export default Nav;