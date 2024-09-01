import React from "react";
import Container from "../../componenets/Container";
import Form from "../../componenets/Form";
import SignUpButton from "../../componenets/SignUpButton";
import "./../../componenets/styles.css";
import Header from "../../componenets/SignInUpHeader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignup } from "../../redux/form/form.slice";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectSignup } from "../../redux/form/selector";
import { signUp } from "../../redux/user/user.slice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import successAudio from '/success.mp3';
import errorAudio from '/error.mp3';

const Step3 = () => {
    const [viewPassword, setViewPassword] = React.useState(false);
    const form = useForm();
    const { register, handleSubmit, formState, watch } = form;
    const watchPassword = watch('password');
    const { errors } = formState;
    const dispatch = useDispatch();
    const form_data = useSelector(selectSignup);
    const navigate = useNavigate();

    useEffect(() => {
        const success = new Audio(successAudio);
        const error = new Audio(errorAudio);
        if (form_data.password !== '') {
            const promise = dispatch(signUp(form_data)).unwrap();
            toast.promise(promise, {
                loading: 'Signing up...',
                success: {
                    render: ({ data }) => {
                        navigate('/signin');
                        success.play();
                        return data.message;
                    },
                    error: {
                        render: ({ data }) => {
                            error.play();
                            return data.message;
                        }
                    }
                }
            });
        }
    }, [dispatch, form_data, navigate]);

    const onSubmit = (data) => {
        dispatch(setSignup(data));
    }
    return (
        <Container>
            <Header>
                <h1 className="m-0 font-sans text-2xl font-semibold text-gray-700">Create a new password</h1>
                <i className="text-sm font-normal text-gray-500 m-0">This password will be required while login back to your account.</i>
            </Header>

            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="w-full">
                    <i className="text-red-500 text-sm">{errors.password?.message}</i>
                    <input className="PhoneInputInput" type="password" placeholder="New password" style={{ padding: '9px 15px', borderColor: errors.password && 'red' }} autoFocus {...register("password", {
                        required: 'Password is required*',
                        minLength: {
                            value: 8,
                            message: 'Password must be atleast 8 characters long'
                        }
                    })} />
                </div>
                <div className="w-full">
                    <i className="text-red-500 text-sm">{errors.ConfirmPassword?.message}</i>
                    <input className="PhoneInputInput" type="password" placeholder="Confirm password" style={{ padding: '9px 15px', borderColor: errors.ConfirmPassword && 'red' }} {...register("ConfirmPassword", {
                        required: 'Confirm password is required*',
                        validate: {
                            matchesPreviousPassword: value => {
                                if (value === watchPassword) {
                                    return true;
                                }
                                return 'Passwords do not match';
                            }
                        }
                    })} />
                </div>
                <SignUpButton>Sign Up</SignUpButton>
            </Form>
        </Container>
    );
};

export default React.memo(Step3);