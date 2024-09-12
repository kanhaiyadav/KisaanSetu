import Header from "../../componenets/SignInUpHeader";
import Container from "../../componenets/Container";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignup } from "../../redux/form/form.slice";
import { motion } from "framer-motion";

const Step1 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Container className="container mx-auto p-4 w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12">
            <Header>
                <h1 className="m-0 font-sans text-2xl font-semibold text-gray-700">Continue as</h1>
                <i className="text-sm font-normal text-gray-500 m-0">This password will be required while login back to your account.</i>
            </Header>

            <div className="flex gap-12 my-5 ">
                <div className="text-center w-48 flex flex-col items-center gap-4">
                        <motion.img src="/Farmer.png" alt="Farmer" className="w-full h-full rounded-xl border-2 border-[#d39a57] cursor-pointer" onClick={
                            ()=> {
                                dispatch(setSignup({ isfarmer: true }));
                                navigate('./2')
                            }
                        }
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3, type: 'spring', stiffness: 260}}
                        />
                    <h2 className="text-xl font-semibold m-0 text-gray-700">Farmer</h2>
                </div>
                <div className="text-center w-48 flex flex-col items-center gap-4">
                        <motion.img src="/Consumer.png" alt="Consumer" className="w-full h-full rounded-xl border-2 border-[#d39a57] cursor-pointer" onClick={
                            ()=> {
                                dispatch(setSignup({ isfarmer: false }));
                                navigate('./2')
                            }
                        }
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3, type: 'spring', stiffness: 260 }}
                        />
                    <h2 className="text-xl font-semibold m-0 text-gray-700">Consumer</h2>
                </div>
            </div>
        </Container>
    );
};

export default Step1;
