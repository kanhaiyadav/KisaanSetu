import { Link, Outlet } from "react-router-dom";
import Logo from "../../componenets/Logo";
import SignIn from "./SignIn";
import LanguageSelector from "../../componenets/LanguageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";

const SignInUp = ({ type }) => {
    const { t } = useTranslation('signInUp');
    const index = t('index', { returnObjects: true });
    return (
        <div className="relative h-full w-full flex bg-cover">
            <div className="flex-1 flex flex-col justify-center items-center px-5 gap-8 bg-gray-100">
                <div className="flex justify-between absolute top-0 left-0 w-full py-2.5 px-5 text-xl font-semibold">
                    <Logo />
                </div>
                {
                    type === 'signup' ? <Outlet /> : <SignIn />
                }
                {
                    type === 'signup' ?
                        <p className="text-gray-700">{index.askSigninP1} <Link to={'/signin'} className="text-lg font-semibold text-[#d39a57] hover:underline">{index.askSigninP2}</Link></p>
                        :
                        <p className="text-gray-700">Don&apos;t have an account? <Link to={'/signup'} className="text-lg font-semibold text-[#d39a57] hover:underline">Sign Up</Link></p>
                }
            </div>
            <div className="relative w-1/2 hidden md:block min-w-[400px]">
                <img src="/SignInUp.jpeg" alt="farmer" className="h-full w-full object-cover" />
                <div className="absolute top-0 h-full w-full bg-no-repeat" style={{ backgroundImage: 'url(/wave1.svg)' }}></div>
            </div>
            <LanguageSelector style={{position:"absolute", right: '10px', top: "30px"}}/>
        </div>
    );
};

export default SignInUp;
