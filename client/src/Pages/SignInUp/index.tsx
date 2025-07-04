import { Link, Outlet } from "react-router-dom";
import Logo from "../../components/Logo";
import SignIn from "./SignIn";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import { useTranslation } from "react-i18next";
import { LoginForm } from "@/components/LoginForm";

const SignInUp = ({ type }: {
    type: 'signin' | 'signup';
}) => {
    const { t } = useTranslation('signInUp');
    interface Index {
        askSigninP1: string;
        askSigninP2: string
    }
    const index: Index = t('index', { returnObjects: true }) as Index;
    return (
        <div className="relative h-full w-full flex bg-cover">
            <div className="flex-1 flex flex-col justify-between items-center px-5 pb-8 gap-8 bg-gray-100">
                <div className="flex justify-between w-full py-2.5 px-5">
                    <Logo />
                    <LanguageSelector />
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
        </div>
    );
};

export default SignInUp;
