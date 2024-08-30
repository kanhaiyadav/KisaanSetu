// import CustomButton from "../../componenets/CutomeButton/CustomButton.component";
import { Outlet } from "react-router-dom"
import Nav from "./nav.component";

const Farmer = () => {
    return (
        <div className="flex h-screen bg-gray-200">
            <Nav />
            <Outlet />
        </div>
    );
}

export default Farmer;