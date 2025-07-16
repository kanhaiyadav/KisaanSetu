import { Outlet } from "react-router-dom";
import Nav from "./nav";
import { useState } from "react";
import Header from "@/components/DashboardHeader";

const Farmer = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="flex flex-col h-dvh w-full bg-gray-200 pb-[60px] xs:pb-0">
            <Header expanded={expanded} setExpanded={setExpanded} />
            <div className="flex-1 min-h-0 relative">
                <Nav expanded={expanded} setExpanded={setExpanded} />
                <div className="h-full overflow-auto ml-0 xs:ml-[60px] scrollbar">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Farmer;
