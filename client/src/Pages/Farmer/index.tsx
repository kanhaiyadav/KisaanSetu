import { Outlet } from "react-router-dom";
import Nav from "./nav";
import { selectUserInfo } from "../../redux/user/selectors";
import { getSales } from "../../redux/product/product.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/product/product.slice";
import { AppDispatch } from "../../redux/store";
import Header from "@/components/DashboardHeader";
import { useLocation } from "react-router-dom";

const Farmer = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(selectUserInfo);
    useEffect(() => {
        dispatch(fetchProducts(user._id));
        dispatch(getSales(user._id));
    }, [dispatch, user._id]);

    return (
        <div className="h-screen bg-gray-200 pb-[60px] xs:pb-0 ml-0 xs:ml-[50px]">
            <Nav />
            <div className="flex-1 h-full flex flex-col overflow-y-auto overflow-x-hidden">
                <Header title={path?path:'Dashboard'} />
                <Outlet />
            </div>
        </div>
    );
};

export default Farmer;
