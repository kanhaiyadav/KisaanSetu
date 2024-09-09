import React, { useEffect } from "react";
import { Outlet } from "react-router-dom"
import Nav from "./nav";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/product/product.slice";
import { selectIsFarmer, selectUserInfo } from "../../redux/user/selectors";
import { toast } from "react-toastify";

const Farmer = () => {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserInfo)._id;
    useEffect(() => {
        const promise = dispatch(fetchProducts(userId)).unwrap();
        toast.promise(promise, {
            pending: "Fetching products...",
        }, {
            position: "top-center",
        });
    }, [dispatch, userId]);
    return (
        <div className="flex h-screen bg-gray-200">
            <Nav />
            <Outlet />
        </div>
    );
}

export default Farmer;