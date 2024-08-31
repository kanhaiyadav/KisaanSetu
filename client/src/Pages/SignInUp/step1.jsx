import { Link } from "react-router-dom";
import Header from "../../componenets/SignInUpHeader";
import Container from "../../componenets/Container";

const Step1 = () => {
    return (
        <Container>
            <Header>
                <h1 className="m-0 font-sans text-2xl font-semibold text-gray-700">Continue as</h1>
                <i className="text-sm font-normal text-gray-500 m-0">This password will be required while login back to your account.</i>
            </Header>

            <div className="flex gap-12 my-5">
                <div className="text-center w-48 flex flex-col items-center gap-4">
                    <Link to="2" className="w-full h-48 rounded-lg overflow-hidden shadow-md transition-transform duration-300 border-2 border-[#d39a57] hover:shadow-lg hover:scale-110 hover:border-3">
                        <img src="/Farmer.png" alt="Farmer" className="w-full h-full" />
                    </Link>
                    <h2 className="text-xl font-semibold m-0 text-gray-700">Farmer</h2>
                </div>
                <div className="text-center w-48 flex flex-col items-center gap-4">
                    <Link to="2" className="w-full h-48 rounded-lg overflow-hidden shadow-md transition-transform duration-300 border-2 border-[#d39a57] hover:shadow-lg hover:scale-110 hover:border-3">
                        <img src="/Consumer.png" alt="Consumer" className="w-full h-full" />
                    </Link>
                    <h2 className="text-xl font-semibold m-0 text-gray-700">Consumer</h2>
                </div>
            </div>
        </Container>
    );
};

export default Step1;
