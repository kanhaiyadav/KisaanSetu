import { Outlet } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="relative h-full w-full flex bg-cover">
            <div className="flex-1 flex flex-col justify-center items-center px-5">
                <div className="flex justify-between absolute top-0 left-0 w-full py-2.5 px-5 text-xl font-semibold">
                    <h1>Logo</h1>
                </div>
                <Outlet />
            </div>
            <div className="relative w-1/2">
                <img src="/SignInUp.jpeg" alt="farmer" className="h-full w-full object-cover" />
                <div className="absolute top-0 h-full w-full bg-no-repeat" style={{ backgroundImage: 'url(/wave1.svg)' }}></div>
            </div>
        </div>
    );
};

export default SignUp;
