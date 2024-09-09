import React, { useEffect } from "react";
import { Outlet } from "react-router-dom"
import Nav from "./nav";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/product/product.slice";
import { selectIsFarmer, selectUserInfo} from "../../redux/user/selectors";

const Farmer = () => {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserInfo)._id;
    useEffect(() => {
        dispatch(fetchProducts(userId));
    }, [dispatch, userId]);
    return (
        <div className="flex h-screen bg-gray-200">
            <Nav />
            <Outlet />
        </div>
    );
}

export default Farmer;