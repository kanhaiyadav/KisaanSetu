import { Outlet } from "react-router-dom"
import Nav from "./nav";
import { selectUserInfo } from "../../redux/user/selectors";
import { getSales } from "../../redux/product/product.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/product/product.slice";

const Farmer = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    useEffect(() => {
        dispatch(fetchProducts(user._id));
        dispatch(getSales(user._id));
    }, [dispatch, user._id]);

    
    return (
        <div className="flex h-screen bg-gray-200">
            <Nav />
            <Outlet />
        </div>
    );
}

export default Farmer;