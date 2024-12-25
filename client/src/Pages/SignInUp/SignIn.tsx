import React from "react";
import Container from "../../components/Container";
import Form from "../../components/Form";
import SignUpButton from "../../components/SignUpButton";
import "./../../components/styles.css";
import Header from "../../components/SignInUpHeader";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/user/user.slice";
import { toast } from "react-toastify";
import successAudio from '/success.mp3';
import errorAudio from '/error.mp3';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { AppDispatch } from "../../redux/store";


const SignIn = () => {
    const [viewPassword, setViewPassword] = React.useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const form = useForm<FormData>();
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const success = new Audio(successAudio);
    const error = new Audio(errorAudio);

    interface FormData {
        email: string;
        password: string;
    }

    interface ToastRenderProps {
        data: {
            data: {
                isfarmer: boolean;
            };
            message: string;
        };
    }

    const onSubmit = (data: FormData) => {
        const promise = dispatch(signIn(data)).unwrap();
        toast.promise(promise, {
            pending: 'Signing in...',
            success: {
                render({ data }: ToastRenderProps) {
                    if (data.data.isfarmer)
                        navigate('/farmer');
                    else
                        navigate('/consumer');
                    success.play();
                    return data.message;
                },
                autoClose: 5000,
            },
            error: {
                render({ data }: { data: { message: string } }) {
                    error.play();
                    return data.message;
                }
            }
        });
    }
    return (
        <Container>
            <Header>
                <h1 className="m-0 font-sans text-2xl font-semibold text-gray-700">Welcom Back!</h1>
                <i className="text-sm font-normal text-gray-500 m-0">Enter your email and password to continue.</i>
            </Header>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <i className="text-sm text-red-500">{errors.email?.message}</i>
                    <input className={`PhoneInputInput ${errors.email ? 'focus:border-red-500' : 'focus:border-[#d39a57]'}`} type="email" placeholder="Your Email" style={{ padding: '9px 15px' }} {...register("email", {
                        required: 'Email is required*',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Invalid email address*'
                        },
                    })} />
                </div>
                <div className="w-full relative">
                    <i className="text-red-500 text-sm">{errors.password?.message}</i>
                    <input className={`PhoneInputInput ${errors.password ? 'focus:border-red-500' : 'focus:border-[#d39a57]'}`} type={viewPassword ? 'text' : 'password'} placeholder="New password" style={{ padding: '9px 15px'}} {...register("password", {
                        required: 'Password is required*',
                    })} />
                    {
                        !viewPassword ?
                            <FaRegEyeSlash className="absolute right-4 top-[50%] translate-y-[-50%] text-gray-600 cursor-pointer text-xl" onClick={() => setViewPassword(true)} />
                            :
                            <FaRegEye className="absolute right-4 top-[50%] translate-y-[-50%] text-gray-600 cursor-pointer text-xl" onClick={() => setViewPassword(false)} />
                    }
                </div>
                {/* <input className="PhoneInputInput" name="password" type="password" placeholder="Password" style={{ padding: '9px 15px' }} {...register('password')} /> */}
                <SignUpButton><>Sign In</></SignUpButton>
            </Form>
        </Container>
    );
};

export default SignIn;