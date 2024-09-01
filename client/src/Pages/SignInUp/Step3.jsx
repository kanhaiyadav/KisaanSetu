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
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

const Step3 = () => {
    const [viewPassword, setViewPassword] = React.useState(false);
    const [viewConfirmPassword, setViewConfirmPassword] = React.useState(false);
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
            console.log('I am up here also');
            toast.promise(promise, {
                loading: 'Signing up...',
                success: {
                    render({ data }) {
                        navigate('/signin');
                        success.play();
                        console.log('I am inside success');
                        return data.message;
                    }
                },
                error: {
                    render({ data }) {
                        console.log('I am inside error');
                        error.play();
                        return data.message;
                    }
                }
            });
}
    }, [dispatch, form_data, navigate]);

const onSubmit = (data) => {
    console.log(data);
    dispatch(setSignup(data));
}
return (
    <Container>
        <Header>
            <h1 className="m-0 font-sans text-2xl font-semibold text-gray-700">Create a new password</h1>
            <i className="text-sm font-normal text-gray-500 m-0">This password will be required while login back to your account.</i>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="w-full relative">
                <i className="text-red-500 text-sm">{errors.password?.message}</i>
                <input className="PhoneInputInput" name="password" type={viewPassword ? 'text' : 'password'} placeholder="New password" style={{ padding: '9px 15px', borderColor: errors.password && 'red' }} autoFocus {...register("password", {
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
            <div className="w-full relative">
                <i className="text-red-500 text-sm">{errors.confirmPassword?.message}</i>
                <input className="PhoneInputInput" name="confirmPassword" type={viewConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" style={{ padding: '9px 15px', borderColor: errors.confirmPassword && 'red' }} {...register("confirmPassword", {
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
                {
                    !viewConfirmPassword ?
                        <FaRegEyeSlash className="absolute right-4 top-[50%] translate-y-[-50%] text-gray-600 cursor-pointer text-xl" onClick={() => setViewConfirmPassword(true)} />
                        :
                        <FaRegEye className="absolute right-4 top-[50%] translate-y-[-50%] text-gray-600 cursor-pointer text-xl" onClick={() => setViewConfirmPassword(false)} />
                }
            </div>
            <SignUpButton>Sign Up</SignUpButton>
        </Form>
    </Container>
);
};

export default React.memo(Step3);