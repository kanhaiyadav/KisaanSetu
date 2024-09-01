import React from "react";
import Container from "../../componenets/Container";
import Form from "../../componenets/Form";
import SignUpButton from "../../componenets/SignUpButton";
import "./../../componenets/styles.css";
import Header from "../../componenets/SignInUpHeader";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/user/user.slice";
import { toast } from "react-toastify";
import successAudio from '/success.mp3';
import errorAudio from '/error.mp3';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";


const SignIn = () => {
    const [viewPassword, setViewPassword] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm();
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const success = new Audio(successAudio);
    const error = new Audio(errorAudio);

    const onSubmit = (data) => {
        const promise = dispatch(signIn(data)).unwrap();
        toast.promise(promise, {
            loading: 'Signing in...',
            success: {
                render({ data }) {
                    console.log(data);
                    if (data.data.isfarmer)
                        navigate('/farmer');
                    else
                        navigate('/consumer');
                    success.play();
                    return data.message;
                }
            },
            error: {
                render({ data }) {
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
                <input className="PhoneInputInput" name="email" type="email" placeholder="Your email" style={{ padding: '9px 15px' }} autoFocus {...register('email')} />
                <div className="w-full relative">
                    <i className="text-red-500 text-sm">{errors.password?.message}</i>
                    <input className="PhoneInputInput" name="password" type={viewPassword ? 'text' : 'password'} placeholder="New password" style={{ padding: '9px 15px', borderColor: errors.password && 'red' }} {...register("password", {
                        required: 'Password is required*',
                        minLength: {
                            value: 8,
                            message: 'Password must be atleast 8 characters long'
                        }
                    })} />
                    {
                        !viewPassword ?
                            <FaRegEyeSlash className="absolute right-4 top-[50%] translate-y-[-50%] text-gray-600 cursor-pointer text-xl" onClick={() => setViewPassword(true)} />
                            :
                            <FaRegEye className="absolute right-4 top-[50%] translate-y-[-50%] text-gray-600 cursor-pointer text-xl" onClick={() => setViewPassword(false)} />
                    }
                </div>
                {/* <input className="PhoneInputInput" name="password" type="password" placeholder="Password" style={{ padding: '9px 15px' }} {...register('password')} /> */}
                <SignUpButton>Sign In</SignUpButton>
            </Form>
        </Container>
    );
};

export default SignIn;