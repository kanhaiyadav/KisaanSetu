import Container from "../../componenets/Container";
import Form from "../../componenets/Form";
import SignUpButton from "../../componenets/SignUpButton";
import "./../../componenets/styles.css";
import Header from "../../componenets/SignInUpHeader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignup } from "../../redux/form/form.slice";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useSelector } from "react-redux";
import { selectSignup } from "../../redux/form/selector";
import { signUp } from "../../redux/user/user.slice";
import { useEffect } from "react";

const Step3 = () => {
    const form = useForm();
    const { register, control, handleSubmit } = form;
    const dispatch = useDispatch();
    const form_data = useSelector(selectSignup);
    const navigate = useNavigate();

    useEffect(() => {
        if (form_data.password !== '') {
            dispatch(signUp(form_data)).unwrap()
                .then(() => {
                    navigate('/signin');
                })
                .catch((error) => {
                    console.log(error);
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

            <Form onSubmit={handleSubmit(onSubmit)}>
                <input className="PhoneInputInput" type="password" placeholder="New password" style={{ padding: '9px 15px' }} autoFocus {...register("password")} />
                <input className="PhoneInputInput" type="password" placeholder="Confirm password" style={{ padding: '9px 15px' }} {...register("confirmPassword")} />
                <SignUpButton>Sign Up</SignUpButton>
            </Form>
            <DevTool control={control} />
        </Container>
    );
};

export default Step3;