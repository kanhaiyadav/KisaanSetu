import { useNavigate } from "react-router";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="h-dvh w-screen flex items-center justify-center">
            <DotLottieReact
                src="/lottie/error.lottie"
                loop
                autoplay
                style={{ width: '300px', height: '300px' }}
            />
            <div className="absolute bottom-10">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-primary text-black px-6 py-2 rounded-lg hover:bg-brown transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default ErrorPage;