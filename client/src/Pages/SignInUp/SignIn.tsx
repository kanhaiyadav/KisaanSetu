import React from "react";
import SignUpButton from "../../components/SignUpButton";
import "./../../components/styles.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/user/user.slice";
import { toast } from "react-toastify";
import successAudio from '/success.mp3';
import errorAudio from '/error.mp3';
import { AppDispatch } from "../../redux/store";
import { LoginForm } from "@/components/LoginForm";


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
        <LoginForm />
    );
};

export default SignIn;