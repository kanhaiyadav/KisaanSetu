import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <img src="/errorPage.svg" alt="" className="w-[600px]" />
            {/* <Button
                variant="destructive"
                className="absolute top-4 left-4"
                onClick={() => {
                    navigate(-1);
                    window.location.reload();
                }}
            >
                <IoMdArrowBack />
                Back
            </Button> */}
        </div>
    );
}

export default ErrorPage;