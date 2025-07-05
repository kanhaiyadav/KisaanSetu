import { Outlet } from "react-router-dom";
import Nav from "./nav";
import { selectUserInfo } from "../../redux/user/selectors";
import { getSales } from "../../redux/product/product.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/product/product.slice";
import { AppDispatch } from "../../redux/store";
import Header from "@/components/DashboardHeader";

const Farmer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [expanded, setExpanded] = useState(false);
    const user = useSelector(selectUserInfo);
    useEffect(() => {
        dispatch(fetchProducts(user._id));
        dispatch(getSales(user._id));
    }, [dispatch, user._id]);

    return (
        <div className="flex flex-col h-screen w-full bg-gray-200 pb-[60px] xs:pb-0">
            <Header expanded={expanded} setExpanded={setExpanded} />
            <div className="flex-1 min-h-0 relative">
                <Nav expanded={expanded}  setExpanded={setExpanded}/>
                <div className="h-full overflow-auto ml-0 xs:ml-[60px] scrollbar">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Farmer;
