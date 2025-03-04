import { Outlet } from "react-router";
import Header from "./Header";

const Consumer = () => {
    return (
        <div className="bg-gray-200 w-screen h-screen flex flex-col">
            <Header />
            <Outlet />
        </div>
    );
}

export default Consumer;